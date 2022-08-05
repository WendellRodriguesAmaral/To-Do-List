import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';
import { TaskInterface } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent  {

  @ViewChild('inputTask') inputTask: ElementRef | undefined;

  position!: number;
  disabled: boolean = true;
  isTaskEquals: boolean = false;
  tasks: TaskInterface[] = this.tasksService.getTask();
  editing: boolean = false;
  task: TaskInterface = {
    taskContent: '',
    done: false,
    edited: false
  };
  taskEdited: TaskInterface = {
    taskContent: '',
    done: false,
    edited: false
  };

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar) { }

  createTask(task: TaskInterface):void {
    this.task.taskContent = this.task.taskContent.trim();
    this.tasks.push(task);
    this.updateTasks()
    this.task.taskContent = "";
    this.disabled = true;
    this.showMessage(" Tarefa criada com sucesso!  ✅", "OK", "green");
  }

  saveTask():void {
    this.createTask(this.task);
    this.inputTask?.nativeElement.focus();
  }
 

  deleteTask(taskClicked: TaskInterface):void {

    if (this.editing) {
      this.showMessage("Não é possivel excluir uma tarefa enquanto estiver em modo edição. ⛔️", "OK", "blue");
      return
    }

    this.tasksService.setTask(this.tasks.filter(task => task != taskClicked));
    this.tasks = this.tasksService.getTask();
    this.showMessage(" Tarefa excluida com sucesso!", "OK", "red");
  }

  editTask(task: TaskInterface, position: number):void {

    if (task.done == true) {
      this.showMessage("Não é possivel editar uma tarefa concluida. ⛔️", "Ok", "red");
      return
    }

    this.position = position;
    this.task.taskContent = task.taskContent;
    this.editing = true;
    this.disabled = false;
  }

  confirmEditTask():void {

    this.taskEdited.taskContent = this.task.taskContent;
    this.taskEdited.edited = true;
    this.tasks[this.position] = this.taskEdited;
    this.updateTasks()
    this.showMessage("Tarefa editada com sucesso! ℹ️", "Entendi", "blue");
    this.task.taskContent = '';
    this.editing = false;
    this.position = -999; //numero negativo qualquer
  } 

  updateTasks():void{
    this.tasksService.setTask(this.tasks);
    this.tasks = this.tasksService.getTask();
  }

  showMessage(msg: string, action: string, classUsed: string): void {
    this.snackBar.open(msg, action, {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: classUsed
    })
  }

  verifyTaskExists():void {
    this.task.taskContent.trim().length == 0 ? this.disabled = true : this.disabled = false;

    //se alguma das tasks do array for igual a task que esta sendo editada e se a posição da task editada for diferente da sua propria posição no array.
    if (this.tasks.some(
      task => task.taskContent.trim().toLowerCase() == this.task.taskContent.trim().toLowerCase()
        && task.done == this.task.done && this.position != this.tasks.indexOf(task) )) {
      this.isTaskEquals = true;
      this.disabled = true;
      return
    }
    this.isTaskEquals = false;
  }

  taskDone(taskClickedDone: TaskInterface):void {

    if (this.tasks.indexOf(taskClickedDone) == this.position) {
      this.showMessage("Não é possivel concluir uma tarefa enquanto estiver em modo edição.  ⛔️", "OK", "blue");
      return
    }

    taskClickedDone.done == false ? taskClickedDone.done = true : taskClickedDone.done = false;
    this.verifyTaskExists();
    this.updateTasks()
    this.showMessage("Status da tarefa alterado com sucesso! 🔄", "Entendi", "blue");
  }

}

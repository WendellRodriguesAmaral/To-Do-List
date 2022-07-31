import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';
import { TaskInterface } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  disabled: boolean = true;
  isTaskEquals: boolean = false;
  tasks: TaskInterface[] = this.tasksService.getTask();
  task: TaskInterface = {
    taskContent: '',
    done: false
  }

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {  
    
  }

  taskDone(taskClickedDone: any) {
    taskClickedDone.done == false ? taskClickedDone.done = true : taskClickedDone.done = false;
    this.verifyTaskExists();
    this.tasksService.setTask(this.tasks);
    this.tasks = this.tasksService.getTask();
    this.showMessage("Status da tarefa alterado com sucesso!", "Entendi", "blue");

  }

  createTask(task: TaskInterface) {
    this.task.taskContent = this.task.taskContent.trim();
    this.tasks.push(task);
    this.tasksService.setTask(this.tasks);
    this.tasks = this.tasksService.getTask();
    this.task.taskContent="";
    this.disabled=true;
    this.showMessage(" Tarefa criada com sucesso!", "OK", "green");

  }
  
  saveTask() {
    this.createTask(this.task);
  }

  verifyTaskExists() {
    this.task.taskContent.trim().length == 0 ? this.disabled = true : this.disabled = false;

    if (this.tasks.some(task => task.taskContent.trim().toLowerCase() == this.task.taskContent.trim().toLowerCase() && task.done == this.task.done)) {
      this.isTaskEquals = true;
      this.disabled = true;
      return
    }
    this.isTaskEquals = false;
  }

  deleteTask(taskClicked:TaskInterface){
    this.tasksService.setTask(this.tasks.filter(task=>task != taskClicked));
    this.tasks = this.tasksService.getTask();
    this.showMessage(" Tarefa excluida com sucesso!", "OK", "red");
  }



  showMessage(msg:string, action:string, classUsed:string):void{
    this.snackBar.open(msg , action, {
      duration:2500,
      horizontalPosition:'right', 
      verticalPosition:'top',
      panelClass:classUsed
    })
  }
}

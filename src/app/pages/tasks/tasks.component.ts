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

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    
  }

  taskDone(taskClickedDone: any) {
    taskClickedDone.done == false ? taskClickedDone.done = true : taskClickedDone.done = false;
    this.verifyTaskExists();
    this.tasksService.setTask(this.tasks);
    this.tasks = this.tasksService.getTask();
  }

  createTask(task: TaskInterface) {
    this.task.taskContent = this.task.taskContent.trim();
    this.tasks.push(task);
    this.tasksService.setTask(this.tasks);
    this.tasks = this.tasksService.getTask();
    this.task.taskContent="";
    this.disabled=true;
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
    
  }
}

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

  tasks: TaskInterface[] = this.tasksService.getTask();
  task: TaskInterface = {
    taskContent: '',
    done: false
  }

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  taskDone(taskClickedDone:any){
    taskClickedDone.done == false ? taskClickedDone.done = true : taskClickedDone.done = false;
    this.tasksService.setTask(this.tasks);
  }

  validateInput() {
    this.task.taskContent.trim().length == 0 ? this.disabled = true : this.disabled = false;
  }

  createTask(task: TaskInterface) {
    this.tasks.push(task);
    this.tasksService.setTask(this.tasks);
    console.log(this.tasks);
  }

  saveTask() {
    this.createTask(this.task);
  }

}

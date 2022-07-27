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

  taskDone(taskClickedDone:any){
    taskClickedDone.done == false ? taskClickedDone.done = true : taskClickedDone.done = false;
    this.tasksService.setTask(this.tasks);
  }

  validateInput() {
    this.task.taskContent.trim().length == 0 ? this.disabled = true : this.disabled = false;
  }


  createTask(task: TaskInterface) {

    
    if(this.verifyTaskExists(task)){
      this.isTaskEquals=true;
      this.task.taskContent='';
      return
    }

    this.isTaskEquals=false;
    this.tasks.push(task);
    this.tasksService.setTask(this.tasks);
    window.location.reload();
    
  }

  saveTask() {
    this.createTask(this.task);    
  }

  verifyTaskExists(task: TaskInterface) {
    return this.tasks.some(t => (t.taskContent == task.taskContent) && (t.done == task.done))
  }

}

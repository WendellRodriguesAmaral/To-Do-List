import { Injectable } from '@angular/core';
import { TaskInterface } from 'src/app/shared/models/task.model';

const TASKS = 'tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  // hasTasks() {
    
  // }

  setTask(value:TaskInterface[]) {
    window.localStorage.setItem(TASKS, JSON.stringify(value))
  }

  getTask() {
    return JSON.parse(window.localStorage.getItem(TASKS) || '[]');
  }

  // removeTask() {
  //   window.localStorage.removeItem()
  // }
}

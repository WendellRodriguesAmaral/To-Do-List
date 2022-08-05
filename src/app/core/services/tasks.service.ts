import { Injectable } from '@angular/core';
import { TaskInterface } from 'src/app/shared/models/task.model';


const TASKS = 'tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(){}

  setTask(value:TaskInterface[]):void {
    window.localStorage.setItem(TASKS, JSON.stringify(value))
  }

  getTask():Array<TaskInterface> {
    return JSON.parse(window.localStorage.getItem(TASKS) || '[]');
  }
}

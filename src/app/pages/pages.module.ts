import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';
import { PagesRoutingModule } from './pages-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { PointerDirective } from '../shared/directives/pointer.directive';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    TasksComponent,
    PointerDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    MatIconModule,
    FormsModule
  ]
})
export class PagesModule { }

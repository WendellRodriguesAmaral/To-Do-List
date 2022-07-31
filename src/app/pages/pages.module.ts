import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { PagesRoutingModule } from './pages-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PointerDirective } from '../shared/directives/pointer.directive';
import { FormsModule } from '@angular/forms';
import { VmessageComponent } from '../shared/components/vmessage/vmessage.component';




@NgModule({
  declarations: [
    TasksComponent,
    PointerDirective,
    VmessageComponent
  ],
  imports: [
    CommonModule,    
    
    PagesRoutingModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
  
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { PagesRoutingModule } from './pages-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { PointerDirective } from '../shared/directives/pointer.directive';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { VmessageComponent } from '../shared/components/vmessage/vmessage.component';




@NgModule({
  declarations: [
    TasksComponent,
    PointerDirective,
    ModalComponent,
    VmessageComponent
  ],
  imports: [
    CommonModule,    
    PagesRoutingModule,
    MatIconModule,
    FormsModule
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAnswerComponent } from './admin-answer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AdminAnswerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AdminAnswerComponent
  ]
})
export class AdminAnswerModule { }

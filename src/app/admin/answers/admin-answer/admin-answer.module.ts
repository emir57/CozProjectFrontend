import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAnswerComponent } from './admin-answer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminAnswerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AdminAnswerComponent
  ]
})
export class AdminAnswerModule { }

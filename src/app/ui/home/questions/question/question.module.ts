import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    QuestionComponent
  ]
})
export class QuestionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerSavePageRoutingModule } from './answer-save-routing.module';

import { AnswerSavePage } from './answer-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerSavePageRoutingModule
  ],
  declarations: [AnswerSavePage]
})
export class AnswerSavePageModule {}

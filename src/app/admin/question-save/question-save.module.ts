import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionSavePageRoutingModule } from './question-save-routing.module';

import { QuestionSavePage } from './question-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionSavePageRoutingModule
  ],
  declarations: [QuestionSavePage]
})
export class QuestionSavePageModule {}

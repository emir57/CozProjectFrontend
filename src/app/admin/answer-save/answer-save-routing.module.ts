import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswerSavePage } from './answer-save.page';

const routes: Routes = [
  {
    path: '',
    component: AnswerSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerSavePageRoutingModule {}

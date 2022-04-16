import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSavePage } from './question-save.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionSavePageRoutingModule {}

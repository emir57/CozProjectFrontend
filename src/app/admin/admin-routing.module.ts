import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'answers',
    loadChildren: () => import('./answers/answers.module').then( m => m.AnswersPageModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'question-save',
    loadChildren: () => import('./question-save/question-save.module').then( m => m.QuestionSavePageModule)
  },
  {
    path: 'category-save',
    loadChildren: () => import('./category-save/category-save.module').then( m => m.CategorySavePageModule)
  },
  {
    path: 'answer-save',
    loadChildren: () => import('./answer-save/answer-save.module').then( m => m.AnswerSavePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

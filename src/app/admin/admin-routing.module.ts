import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from '../guards/is-login.guard';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'categories',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'answers',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./answers/answers.module').then(m => m.AnswersPageModule)
  },
  {
    path: 'questions',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsPageModule)
  },
  {
    path: 'question-save',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./question-save/question-save.module').then(m => m.QuestionSavePageModule)
  },
  {
    path: 'category-save',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./category-save/category-save.module').then(m => m.CategorySavePageModule)
  },
  {
    path: 'answer-save',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./answer-save/answer-save.module').then(m => m.AnswerSavePageModule)
  },
  {
    path: 'home',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }

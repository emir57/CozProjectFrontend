import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckAdminAndTeacherGuard } from '../guards/check-admin-and-teacher.guard';
import { CheckAdminRoleGuard } from '../guards/check-admin-role.guard';
import { CheckTeacherRoleGuard } from '../guards/check-teacher-role-guard';
import { IsLoginGuard } from '../guards/is-login.guard';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'categories',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'answers',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./answers/answers.module').then(m => m.AnswersPageModule)
  },
  {
    path: 'questions',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsPageModule)
  },
  {
    path: 'question-save',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./question-save/question-save.module').then(m => m.QuestionSavePageModule)
  },
  {
    path: 'category-save',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./category-save/category-save.module').then(m => m.CategorySavePageModule)
  },
  {
    path: 'answer-save',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./answer-save/answer-save.module').then(m => m.AnswerSavePageModule)
  },
  {
    path: 'home',
    canActivate: [IsLoginGuard, CheckAdminAndTeacherGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'user-save',
    loadChildren: () => import('./user-save/user-save.module').then( m => m.UserSavePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }

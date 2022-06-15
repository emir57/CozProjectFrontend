import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin/admin.page';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { CheckTeacherRoleGuard } from './guards/check-teacher-role-guard';
import { HomePage } from './ui/home/home.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./ui/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./ui/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () => import('./ui/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [CheckAdminRoleGuard, CheckTeacherRoleGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

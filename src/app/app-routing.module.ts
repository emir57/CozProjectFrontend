import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin/admin.page';
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
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

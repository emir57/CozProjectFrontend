import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from 'src/app/guards/is-login.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [IsLoginGuard]
  },
  {
    path: 'questions',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsPageModule)
  },
  {
    path: 'profile',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'stats',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./stats/stats.module').then(m => m.StatsPageModule)
  },
  {
    path: 'settings',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSavePage } from './user-save.page';

const routes: Routes = [
  {
    path: '',
    component: UserSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSavePageRoutingModule {}

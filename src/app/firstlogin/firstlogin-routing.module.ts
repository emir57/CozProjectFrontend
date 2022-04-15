import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstloginPage } from './firstlogin.page';

const routes: Routes = [
  {
    path: '',
    component: FirstloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstloginPageRoutingModule {}

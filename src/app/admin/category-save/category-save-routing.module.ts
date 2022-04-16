import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySavePage } from './category-save.page';

const routes: Routes = [
  {
    path: '',
    component: CategorySavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorySavePageRoutingModule {}

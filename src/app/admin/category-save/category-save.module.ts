import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySavePageRoutingModule } from './category-save-routing.module';

import { CategorySavePage } from './category-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySavePageRoutingModule
  ],
  declarations: [CategorySavePage]
})
export class CategorySavePageModule {}

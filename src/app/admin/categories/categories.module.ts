import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { ColorPickerModule } from 'ngx-color-picker';
import { AdminCategoryModule } from './admin-category/admin-category.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    AdminCategoryModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule { }

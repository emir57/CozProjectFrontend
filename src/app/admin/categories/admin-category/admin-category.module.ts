import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from './admin-category.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AdminCategoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AdminCategoryComponent
  ]
})
export class AdminCategoryModule { }

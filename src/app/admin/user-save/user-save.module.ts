import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSavePageRoutingModule } from './user-save-routing.module';

import { UserSavePage } from './user-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSavePageRoutingModule
  ],
  declarations: [UserSavePage]
})
export class UserSavePageModule {}

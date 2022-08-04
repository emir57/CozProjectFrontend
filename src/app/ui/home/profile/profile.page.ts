import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/tables/user';
import { ResetPasswordPage } from 'src/app/reset-password/reset-password.page';
import { UpdateProfilePage } from 'src/app/update-profile/update-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: User;
  constructor(
    private modalController: ModalController
  ) { }

  async ngOnInit() {

  }

  async updateProfilePage() {
    const modal = await this.modalController.create({
      component: UpdateProfilePage
    })
    return await modal.present();
  }
  async resetPasswordPage() {
    const modal = await this.modalController.create({
      component: ResetPasswordPage
    })
    return await modal.present();
  }
}

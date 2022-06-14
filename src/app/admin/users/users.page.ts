import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/tables/user';
import { UserService } from 'src/app/services/common/user.service';
import { UserSavePage } from '../user-save/user-save.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[]
  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll((users) => {
      this.users = users
    }, (err => {

    }))
  }


  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  async editUserModal(userId: number) {
    const modal = await this.modalController.create({
      component: UserSavePage,
      componentProps: { userId: userId }
    })
    modal.onDidDismiss().then(async value=>{
      if(value.data){
        await this.getUsers();
      }
    })

    return await modal.present();
  }

}

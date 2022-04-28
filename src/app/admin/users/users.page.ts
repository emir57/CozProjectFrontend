import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/tables/user';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[]
  constructor(
    private userService: UserService,
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

}

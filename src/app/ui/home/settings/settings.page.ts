import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  roles: string[] = [];
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    (await this.roleService.getUserRoles()).subscribe(response => {
      console.log(response)
    })
  }

  isAdmin() {
    this.roles.forEach(role => {
      if (role == "Admin") { return true; }
    })
    return false;
  }
  isTeacher() {
    this.roles.forEach(role => {
      if (role == "Teacher") { return true; }
    })
    return false;
  }

}

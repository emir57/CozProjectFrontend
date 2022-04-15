import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isAdmin: boolean = false;
  isTeacher: boolean = false;
  roles: string[] = [];
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    (await this.roleService.getUserRoles()).subscribe(response => {
      response.forEach(role=>{
        if(role == "Admin"){
          this.isAdmin = true;
        }
        if(role == "Teacher"){
          this.isTeacher = true;
        }
      })
    })
  }
}

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

  }

  isAdmin(){
    return this.roleService.isAdmin;
  }
  isTeacher(){
    return this.roleService.isTeacher;
  }
}

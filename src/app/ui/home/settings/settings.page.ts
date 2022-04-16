import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/common/alert-service.service';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  roles: string[] = [];
  constructor(
    private roleService: RoleService,
    private alertService:AlertService
  ) { }

  ngOnInit() {

  }

  isAdmin(){
    return this.roleService.isAdmin;
  }
  isTeacher(){
    return this.roleService.isTeacher;
  }

  logout(){
    this.alertService.showAlertConfirm("Çıkış yapmak istediğinizden eminmisiniz",
    (cancel)=>{console.log("cancel")},
    (ok)=>{console.log("ok")})
  }
}

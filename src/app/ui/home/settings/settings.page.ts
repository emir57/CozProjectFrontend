import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private roleService:RoleService
  ) { }

  ngOnInit() {

  }

}

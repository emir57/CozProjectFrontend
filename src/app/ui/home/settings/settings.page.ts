import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/common/alert-service.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { RoleService } from 'src/app/services/common/role.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  roles: string[] = [];
  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private messageService: SweetalertService
  ) { }

  ngOnInit() {

  }

  isAdmin() {
    return this.roleService.isAdmin;
  }
  isTeacher() {
    return this.roleService.isTeacher;
  }

  async logout() {
    this.alertService.showAlertConfirm("Çıkış yapmak istediğinizden eminmisiniz",
      (cancel) => { console.log("cancel") },
      async (ok) => {
        this.authService.setIsLogin(false);
        await this.storageService.removeName(KeyType.Token);
        await this.storageService.removeName(KeyType.User);
        this.router.navigateByUrl("/login")
        this.messageService.showMessage("Çıkış Başarılı", { iconType: SweetIconType.Success })
      })
  }
}

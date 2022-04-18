import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { LoadingService } from './loading.service';
import { KeyType, StorageService } from './storage.service';
import { SweetalertService, SweetIconType } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  isAdmin: boolean = false;
  isTeacher: boolean = false;
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private messageService: SweetalertService,
    private router: Router
  ) {
    this.getUserRoles();
  }

  async getUserRoles() {
    this.loadingService.showLoading("İşlemler yapılıyor lütfen bekleyiniz.")
    const user: LoginedUser = JSON.parse(await this.storageService.checkName(KeyType.User))
    let url = `${this.baseUrl}api/users/getroles?userId=${user.id}`;
    this.http.get<string[]>(url).subscribe(response => {
      response.forEach(role => {
        if (role == "Admin") {
          this.isAdmin = true;
        }
        if (role == "Teacher") {
          this.isTeacher = true;
        }
      })
      this.loadingService.closeLoading();
    }, async responseErr => {
      console.log(responseErr)
      this.messageService.showMessage("Bilinmeyen bir hata meydana geldi lütfen tekrar giriş yapınız", { iconType: SweetIconType.Warning })
      await this.loadingService.closeLoading();
      await this.storageService.removeName(KeyType.Token);
      await this.storageService.removeName(KeyType.User);
      this.router.navigateByUrl("/login");

    })
  }
}

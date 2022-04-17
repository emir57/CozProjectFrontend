import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { LoadingService } from './loading.service';
import { KeyType, StorageService } from './storage.service';

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
    private loadingService: LoadingService
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
    })
  }
}

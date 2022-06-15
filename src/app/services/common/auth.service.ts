import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/auth/login-model';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import LoginResponseModel from 'src/app/models/auth/loginResponseModel';
import RegisterModel from 'src/app/models/auth/registerModel';
import TokenModel from 'src/app/models/auth/tokenModel';
import ResponseSingleModel from 'src/app/models/responseSingleModel';
import { KeyType, StorageService } from './storage.service';
import { SweetalertService, SweetIconType } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private messageService: SweetalertService,
    private router: Router,
    private storageService: StorageService
  ) { }
  private isLogin = false;



  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
    console.log(this.baseUrl)
  }
  getIsLogin() {
    return this.isLogin;
  }

  login(loginModel: LoginModel) {
    let newUrl = `${this.baseUrl}api/auth/login`;
    return this.http.post<LoginResponseModel>(newUrl, loginModel)
  }

  register(registerModel: RegisterModel) {
    let newUrl = `${this.baseUrl}api/auth/register`;
    return this.http.post<ResponseSingleModel<LoginedUser>>(newUrl, registerModel);
  }

  async logout() {

  }
}

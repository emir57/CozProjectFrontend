import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/auth/login-model';
import LoginResponseModel from 'src/app/models/auth/loginResponseModel';
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

  login(loginModel: LoginModel) {
    let newUrl = `${this.baseUrl}api/auth/login`;
    return this.http.post<LoginResponseModel>(newUrl, loginModel)
  }

  register(registerModel: RegisterModel) {

  }
}

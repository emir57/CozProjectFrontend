import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/auth/login-model';
import TokenModel from 'src/app/models/auth/tokenModel';
import ResponseSingleModel from 'src/app/models/responseSingleModel';
import { StorageService } from './storage.service';
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
    this.http.post<ResponseSingleModel<TokenModel>>(newUrl, loginModel).subscribe(response => {
      if (response.success) {
        this.messageService.showMessage(response.message, { iconType: SweetIconType.Success })
      }
    }, responseErr => {
      console.error(responseErr.error.Message)
    })
  }
}

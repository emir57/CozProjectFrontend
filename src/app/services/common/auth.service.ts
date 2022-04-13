import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/auth/login-model';
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
    this.http.post<ResponseSingleModel<TokenModel>>(newUrl, loginModel).subscribe(response => {
      if (response.success) {
        this.storageService.setName(KeyType.Token, response.data)
        this.messageService.showMessage("Giriş Başarılı Anasayfaya Yönlendiriliyorsunuz", { iconType: SweetIconType.Success })
      } else if (!response.success) {
        this.messageService.showMessage(response.message, { iconType: SweetIconType.Error })
      }
    }, responseErr => {
      this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
      if (responseErr.error.Errors) {
        for (let i = 0; i < responseErr.error.Errors.length; i++) {
          let message = responseErr.error.Errors[i];
          this.messageService.showMessage(message.ErrorMessage, { iconType: SweetIconType.Error })
        }
      }
      else if(responseErr.error.message == "Şifre Yanlış"){
        this.messageService.showMessage("Eposta veya şifre hatalı", { iconType: SweetIconType.Error })
      }
    })
  }
}

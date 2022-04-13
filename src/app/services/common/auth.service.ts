import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/auth/login-model';
import TokenModel from 'src/app/models/auth/tokenModel';
import ResponseSingleModel from 'src/app/models/responseSingleModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject("baseUrl") private baseUrl: string, private http: HttpClient) { }
  private isLogin = false;



  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
    console.log(this.baseUrl)
  }

  login(loginModel: LoginModel) {
    let newUrl = `${this.baseUrl}/api/auth/login`;
    this.http.post<ResponseSingleModel<TokenModel>>(newUrl, loginModel).subscribe(response => {
      if (response.success) {

      }
    }, responseErr => {
      console.error(responseErr)
    })
  }
}

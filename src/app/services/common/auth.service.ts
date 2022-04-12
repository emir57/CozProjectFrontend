import { Inject, Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/auth/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject("baseUrl") private baseUrl: string) { }
  private isLogin = false;



  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
    console.log(this.baseUrl)
  }

  login(loginModel: LoginModel) {

  }
}

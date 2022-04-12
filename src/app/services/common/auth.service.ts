import { Inject, Injectable } from '@angular/core';

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

  login() {

  }
}

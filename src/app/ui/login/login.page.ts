import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/login-model';
import TokenModel from 'src/app/models/auth/tokenModel';
import { AuthService } from 'src/app/services/common/auth.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isOk: boolean = true;
  loginForm: FormGroup;
  token: TokenModel = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  async login() {
    if (this.loginForm.valid) {
      this.isOk = false;
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel)
      // let interval = setInterval(() => {
      //   setTimeout(() => {
      //     console.log(this.token)
      //     if (this.token) {
      //       clearInterval(interval);
      //       this.isOk = true;
      //     }
      //   }, 500);
      // })
      await this.checkToken();
    }

  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  async checkToken() {
    try {
      if (!this.token) {
        this.token = JSON.parse(await this.storageService.checkName(KeyType.Token));
        throw new Error;
      } else {
        this.isOk = true;
      }
    } catch (error) {
      setTimeout(() => {
        this.checkToken();
      }, 1000);
    }
  }
}



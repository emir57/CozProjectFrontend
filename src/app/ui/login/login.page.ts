import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import TokenModel from 'src/app/models/auth/tokenModel';
import { AuthService } from 'src/app/services/common/auth.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { RoleService } from 'src/app/services/common/role.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isOk: boolean = true;
  loginForm: FormGroup;
  token: TokenModel = undefined;
  user: LoginedUser = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: SweetalertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private roleService: RoleService
  ) { }
  ngOnInit() {
    this.checkStorage();
    this.createLoginForm();
    this.activatedRoute.params.subscribe(param => {
      if (param["email"]) {
        this.loginForm.get("email").setValue(param["email"]);
      }
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  async checkStorage() {
    const user = await this.storageService.getValue(KeyType.User);
    const token = await this.storageService.getValue(KeyType.Token);
    if (user && token) {
      this.router.navigateByUrl("/home/questions")
    }
  }

  async login() {
    if (this.loginForm.valid) {
      await this.loadingService.showLoading("Giriş Yapılıyor");
      this.isOk = false;
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel).subscribe(async response => {
        if (response.success) {
          this.storageService.setValue(KeyType.Token, response.data.token);
          this.storageService.setValue(KeyType.User, response.data.user);
          this.authService.setIsLogin(true);
          this.isOk = true;
          await this.roleService.getUserRoles();
          await this.loadingService.closeLoading();
          this.messageService.showMessage("Giriş Başarılı Anasayfaya Yönlendiriliyorsunuz", { iconType: SweetIconType.Success });
          await this.checkToken();

        } else if (!response.success) {
          this.messageService.showMessage(response.message, { iconType: SweetIconType.Error })
          this.isOk = true;
          await this.loadingService.closeLoading();
        }
      }, async responseErr => {
        this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
        if (responseErr.error.Errors) {
          for (let i = 0; i < responseErr.error.Errors.length; i++) {
            let message = responseErr.error.Errors[i];
            this.messageService.showMessage(message.ErrorMessage, { iconType: SweetIconType.Error })
          }
        }
        else if (responseErr.error.message == "Şifre Yanlış") {
          this.messageService.showMessage("Eposta veya şifre hatalı", { iconType: SweetIconType.Error })
        }
        this.isOk = true;
        await this.loadingService.closeLoading();
      })

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
      if (!this.token && !this.user) {
        this.token = JSON.parse(await this.storageService.getValue(KeyType.Token));
        this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
        throw new Error;
      } else {
        setTimeout(() => {
          this.router.navigateByUrl("/home/questions")
        }, 1000);
        this.isOk = true;
      }
    } catch (error) {
      setTimeout(() => {
        this.checkToken();
      }, 1000);
    }
  }
}



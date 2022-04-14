import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import TokenModel from 'src/app/models/auth/tokenModel';
import { AuthService } from 'src/app/services/common/auth.service';
import { ImageUploadService, LocalFile } from 'src/app/services/common/image-upload.service';
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
    private imageUploadService: ImageUploadService
  ) { }

  images: LocalFile[] = [];
  ngOnInit() {
    this.createLoginForm();
    this.activatedRoute.params.subscribe(param => {
      if (param["email"]) {
        this.loginForm.get("email").setValue(param["email"]);
      }
    })

    this.imageUploadService.loadFiles();
    setTimeout(() => {
      this.images = this.imageUploadService.images;
    }, 1000);
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
      this.authService.login(loginModel).subscribe(response => {
        if (response.success) {
          this.storageService.setName(KeyType.Token, response.data.token);
          this.storageService.setName(KeyType.User, response.data.user);
          this.authService.setIsLogin(true);
          this.messageService.showMessage("Giriş Başarılı Anasayfaya Yönlendiriliyorsunuz", { iconType: SweetIconType.Success });
          this.router.navigateByUrl("/home")
        } else if (!response.success) {
          this.messageService.showMessage(response.message, { iconType: SweetIconType.Error })
          this.isOk = true;
        }
      }, responseErr => {
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
      })
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
      if (!this.token && !this.user) {
        this.token = JSON.parse(await this.storageService.checkName(KeyType.Token));
        this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
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

  async uploadImage() {
    // await this.imageUploadService.selectImage();
    // this.imageUploadService.deleteFiles();
  }
}



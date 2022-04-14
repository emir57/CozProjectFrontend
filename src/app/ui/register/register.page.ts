import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { LoadingService } from 'src/app/services/common/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isOk: boolean = true;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['Emir', [Validators.required, Validators.maxLength(20)]],
      lastName: ['Gürbüz', [Validators.required, Validators.maxLength(20)]],
      email: ['emir.gurbuz07@hotmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['123456', [Validators.required, Validators.minLength(5)]],
      rePassword: ['123456', [Validators.required]]
    }, { validators: this.checkPassword })
  }

  register() {
    if (this.registerForm.valid) {
      this.isOk = false;

    }
    this.router.navigate(["/login", { email: this.registerForm.get("email").value }])
  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("password").value;
    let rePassword = group.get("rePassword").value;
    return password === rePassword ? null : { notSame: true }
  }

  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get firstName() {
    return this.registerForm.get("firstName");
  }
  get lastName() {
    return this.registerForm.get("lastName");
  }
  get rePassword() {
    return this.registerForm.get("rePassword");
  }

}

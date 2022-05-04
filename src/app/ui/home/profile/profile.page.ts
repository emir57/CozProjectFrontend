import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isOk: boolean = true;
  saveForm: FormGroup;
  resetPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createSaveForm();
    this.createResetPasswordForm();
  }
  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.maxLength(30)]],
      password: ["", [Validators.required,Validators.minLength(5)]]
    })
  }
  createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(5)]],
      newPassword: ["", [Validators.required, Validators.minLength(5)]],
      newRePassword: ["", [Validators.required, Validators.minLength(5)]]
    }, { validators: this.checkpassword })
  }


  save() {

  }
  resetPassword() {

  }

  checkpassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("newPassword").value;
    let repassword = group.get("newRePassword").value;
    return password === repassword ? null : { notSame: true };
  }
}

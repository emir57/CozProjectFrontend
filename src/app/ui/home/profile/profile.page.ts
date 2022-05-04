import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/tables/user';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: User;
  isOk: boolean = true;
  saveForm: FormGroup;
  resetPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.createSaveForm();
    this.createResetPasswordForm();
    this.currentUser = JSON.parse(await this.storageService.checkName(KeyType.User));
  }
  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.maxLength(30)]],
      password: ["", [Validators.required, Validators.minLength(5)]]
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
    if (this.saveForm.valid) {
      this.isOk = false;
    }
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isOk = false;
    }
  }

  checkpassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("newPassword").value;
    let repassword = group.get("newRePassword").value;
    return password === repassword ? null : { notSame: true };
  }
}

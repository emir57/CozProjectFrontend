import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/tables/user';
import { UserResetPasswordModel } from '../models/tables/userResetPasswordModel';
import { KeyType, StorageService } from '../services/common/storage.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';
import { UserService } from '../services/common/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  currentUser: User;
  isOk: boolean = true;
  resetPasswordForm: FormGroup;
  constructor(
    private messageService: SweetalertService,
    private storageService: StorageService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.createResetPasswordForm();
    this.currentUser = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(5)]],
      newPassword: ["", [Validators.required, Validators.minLength(5)]],
      newRePassword: ["", [Validators.required, Validators.minLength(5)]]
    }, { validators: this.checkpassword })
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isOk = false;
      let resetPasswordModel: UserResetPasswordModel = this.resetPasswordForm.value;
      resetPasswordModel.email = this.currentUser.email;
      this.userService.resetPassword(resetPasswordModel,
        (responseErr) => {
          this.isOk = true;
          this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error });
        }, (response) => {
          this.isOk = true;
          this.messageService.showMessage(response.message, { iconType: SweetIconType.Success });
        })
    }
  }

  checkpassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("newPassword").value;
    let repassword = group.get("newRePassword").value;
    return password === repassword ? null : { notSame: true };
  }

}

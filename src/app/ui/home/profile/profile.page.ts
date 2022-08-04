import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import ResponseModel from 'src/app/models/responseModel';
import { UpdateUserModel } from 'src/app/models/tables/updateUserModel';
import { User } from 'src/app/models/tables/user';
import { UserResetPasswordModel } from 'src/app/models/tables/userResetPasswordModel';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';
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
    private storageService: StorageService,
    private messageService: SweetalertService
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
  updateProfilePage() {

  }
  resetPasswordPage() {

  }
}

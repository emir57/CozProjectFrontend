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
      let updateUser: UpdateUserModel = this.saveForm.value;
      updateUser.email = this.currentUser.email;
      this.userService.updateProfile(updateUser,
        (responseErr) => {
          this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error });
          this.isOk = true;
        }, async (response) => {
          this.messageService.showMessage(response.message, { iconType: SweetIconType.Success });
          this.isOk = true;
          await this.storageService.setName(KeyType.User, this.currentUser);
          this.currentUser = JSON.parse(await this.storageService.checkName(KeyType.User));
        })
    }
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UpdateUserModel } from '../models/tables/updateUserModel';
import { User } from '../models/tables/user';
import { KeyType, StorageService } from '../services/common/storage.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';
import { UserService } from '../services/common/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  currentUser: User;
  isOk: boolean = true;
  saveForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private messageService: SweetalertService,
    private userService: UserService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.createSaveForm();
    this.currentUser = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.maxLength(30)]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    })
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
          await this.storageService.setValue(KeyType.User, this.currentUser);
          this.currentUser = JSON.parse(await this.storageService.getValue(KeyType.User));
        })
    }
  }

  async close() {
    await this.modalController.dismiss();
  }

}

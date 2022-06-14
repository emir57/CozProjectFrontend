import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UpdateUserAdmin } from 'src/app/models/admin/updateUserAdmin';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.page.html',
  styleUrls: ['./user-save.page.scss'],
})
export class UserSavePage implements OnInit {

  form: FormGroup;
  user: UpdateUserAdmin;
  @Input() userId: number;
  constructor(
    private modalController: ModalController,
    private messageService: SweetalertService,
    private userService: UserService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  getUser(){

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: ["", [Validators.required]],
      firstName: ["", [Validators.maxLength(50)]],
      lastName: ["", [Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50)]],
      emailConfirmed: [false, [Validators.required]],
      score: [0, [Validators.required, Validators.min(0)]],
      profilePhotoUrl: [""]
    })
  }

  update() {

  }

}

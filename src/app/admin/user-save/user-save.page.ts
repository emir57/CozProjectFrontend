import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UpdateUserAdmin } from 'src/app/models/admin/updateUserAdmin';
import { Role } from 'src/app/models/tables/role';
import { LoadingService } from 'src/app/services/common/loading.service';
import { RoleService } from 'src/app/services/common/role.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';
import { UserService } from 'src/app/services/common/user.service';
declare var $: any;

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.page.html',
  styleUrls: ['./user-save.page.scss'],
})
export class UserSavePage implements OnInit {

  allRoles: Role[] = [];
  userRoles: Role[] = [];
  form: FormGroup;
  user: UpdateUserAdmin;
  @Input() userId: number;
  constructor(
    private modalController: ModalController,
    private messageService: SweetalertService,
    private userService: UserService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) { }

  async ngOnInit() {
    this.createForm();
    await this.getUser();
    await this.getAllRoles();
    await this.getUserRoles();
  }

  async getUser() {
    if (!this.userId) return;
    await this.loadingService.showLoading();
    this.userService.getById(this.userId).subscribe(async response => {
      if (response.success) {
        this.user = response.data;
      }
      await this.loadingService.closeLoading();
    }, async responseErr => {
      this.messageService.showMessage(responseErr.error.message, {
        iconType: SweetIconType.Error
      })
      setTimeout(async () => {
        await this.close();
      }, 500);
      await this.loadingService.closeLoading();
    })
  }

  async getAllRoles() {
    await this.loadingService.showLoading();
    this.roleService.getRoles().subscribe(async response => {
      if (response.success) {
        this.allRoles = response.data;
      }
      await this.loadingService.closeLoading();
    }, async responseErr => {
      await this.loadingService.closeLoading();
    })
  }

  async getUserRoles() {
    await this.loadingService.showLoading();
    this.roleService.getUserRolesAdmin(this.userId).subscribe(async roles => {
      this.userRoles = roles;
      await this.loadingService.closeLoading();
    }, async responseErr => {
      await this.loadingService.closeLoading();
    })
  }
  updateSelectedRoles(role: Role) {
    let index = this.userRoles.findIndex(x => x.id === role.id);
    if (index === -1) {
      this.userRoles.push(role);
    } else {
      this.userRoles.splice(index, 1);
    }
    console.log(this.userRoles);
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

  async update() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.form.get("score").setValue(+this.form.get("score").value);
      await this.loadingService.showLoading();
      this.userService.updateUserAdmin(this.form.value).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message);
          this.close(this.form.value);
        }
        await this.loadingService.closeLoading();
      }, async responseErr => {
        console.log(responseErr)
        this.messageService.showMessage(responseErr.error.message, {
          iconType: SweetIconType.Error
        });
        await this.loadingService.closeLoading();
      })
    }
  }

  async close(data?: any) {
    await this.modalController.dismiss(data);
  }

}

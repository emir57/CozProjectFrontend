import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.page.html',
  styleUrls: ['./user-save.page.scss'],
})
export class UserSavePage implements OnInit {

  @Input() userId: number;
  constructor(
    private modalController: ModalController,
    private messageService: SweetalertService,
    private userService: UserService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  update() {

  }

}

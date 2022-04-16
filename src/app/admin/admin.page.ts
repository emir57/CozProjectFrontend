import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/common/alert-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async exitPanel() {
    await this.alertService.showAlertConfirm("Panelden çıkmak üzeresiniz","Panelden Çıkılıyor",
    ()=>{},
    ()=>{
      this.router.navigateByUrl("/home/questions")
    })
  }

}

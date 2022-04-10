import { Component } from '@angular/core';
import { SweetalertService } from './services/sweetalert.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sweetAlertService:SweetalertService) {
    this.sweetAlertService.showMessage();
  }
}

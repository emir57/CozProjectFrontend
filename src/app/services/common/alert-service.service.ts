import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertSErviceService {

  constructor(
    private alertController: AlertController
  ) { }
  async showAlertConfirm(message: string, cancelFunction: Function, okFunction: Function) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: cancelFunction()
        }, {
          text: 'Okay',
          handler: okFunction()
        }
      ]
    });

    await alert.present();
  }
}

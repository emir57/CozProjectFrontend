import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }
  async showAlertConfirm(message: string, cancelFunction, okFunction) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: cancelFunction
        }, {
          text: 'Tamam',
          handler: okFunction
        }
      ]
    });

    await alert.present();
  }
}

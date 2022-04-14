import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingControl: LoadingController
  ) { }

  async showLoading(message: string) {
    const loading = await this.loadingControl.create({
      message: message
    })
    await loading.present();
  }

  async closeLoading() {
    this.loadingControl.dismiss();
  }
}

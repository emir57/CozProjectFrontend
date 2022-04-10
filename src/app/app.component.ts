import { Component } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isMotion: string = "";
  constructor() {
    this.motion();
  }
  async motion() {
    await Motion.addListener("accel", event => {
      this.isMotion = "Device motion event: " + event;
    })
  }
}

import { Component } from '@angular/core';
import * as alertifyjs from "alertifyjs"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    alertifyjs.notify("msg","success");
  }
}

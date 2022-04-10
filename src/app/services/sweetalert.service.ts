import { Injectable } from '@angular/core';
import * as sweetalert from "../../../node_modules/sweetalert2/dist/sweetalert2.min.js"

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  showMessage(message: String, options: Partial<SweetOptions> = {}) {
    const Toast = sweetalert.mixin({
      toast: true,
      position: options.position ?? SweetPosition.Top,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', sweetalert.stopTimer)
        toast.addEventListener('mouseleave', sweetalert.resumeTimer)
      }
    })
    Toast.fire({
      icon: options.iconType ?? SweetIconType.Success,
      title: message
    })
  }
}
export class SweetOptions {
  iconType: SweetIconType;
  position: SweetPosition;
}
export enum SweetIconType {
  Success = "success",
  Info = "info",
  Error = "error",
  Question = "question"
}
export enum SweetPosition {
  Top = "top-end",
  Bottom = "bottom-end"
}

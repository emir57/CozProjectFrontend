import { Injectable } from '@angular/core';
import * as sweetalert from "sweetalert2/dist/sweetalert2.min"

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  showMessage(message: String, options: Partial<SweetOptions> = {}) {
    const Toast = sweetalert.mixin({
      toast: true,
      position: options.position ?? SweetPosition.Top,
      showConfirmButton: options.confirmButton ?? false,
      timer: options.time ?? 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', sweetalert.stopTimer)
        toast.addEventListener('mouseleave', sweetalert.resumeTimer)
      }
    })
    Toast.fire({
      icon: options.iconType ?? SweetIconType.Success,
      title: message,
    })
  }
}
export class SweetOptions {
  iconType: SweetIconType;
  position: SweetPosition;
  time: number;
  confirmButton: boolean;
}
export enum SweetIconType {
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error",
  Question = "question"
}
export enum SweetPosition {
  Top = "top-end",
  Bottom = "bottom-end"
}

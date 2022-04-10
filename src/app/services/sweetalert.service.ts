import { Injectable } from '@angular/core';
import * as sweetalert from "../../../node_modules/sweetalert2/dist/sweetalert2.min.js"

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  showMessage(message: String) {
    const Toast = sweetalert.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', sweetalert.stopTimer)
        toast.addEventListener('mouseleave', sweetalert.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'question',
      title: message
    })
  }
}
export enum IconType{
  Success = "success",
  Info = "info",
  Error = "error",
  Question = "question"
}

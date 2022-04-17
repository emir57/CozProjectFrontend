import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import TokenModel from '../models/auth/tokenModel';
import { KeyType, StorageService } from '../services/common/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  tokenModel: TokenModel
  constructor(
    private storageService: StorageService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.getToken();
    console.log(this.tokenModel)
    let newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + this.tokenModel.token)
    })

    return next.handle(newRequest);
  }

  async getToken() {
    this.tokenModel = JSON.parse(await this.storageService.checkName(KeyType.Token));
  }
}

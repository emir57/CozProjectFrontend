import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<unknown>, next: HttpHandler) {
    this.tokenModel = JSON.parse(await this.storageService.checkName(KeyType.Token));
    let newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + this.tokenModel.token)
    })
    return next.handle(newRequest).toPromise();
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import TokenModel from '../models/auth/tokenModel';
import { KeyType, StorageService } from '../services/common/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  token: TokenModel
  constructor(
    private storageService: StorageService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  async getToken() {
    this.token = JSON.parse(await this.storageService.checkName(KeyType.Token));
  }
}

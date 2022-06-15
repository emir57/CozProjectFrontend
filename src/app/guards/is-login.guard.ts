import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/common/auth.service';
import { KeyType, StorageService } from '../services/common/storage.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private messageService: SweetalertService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subject = new Subject<boolean>();
    const token = this.storageService.getValue(KeyType.Token)
    const user = this.storageService.getValue(KeyType.User)
    user.then(userValue => {
      token.then((tokenValue) => {
        if (userValue && tokenValue) {
          this.authService.setIsLogin(true);
          subject.next(true);
          subject.complete();
          return subject.asObservable();
        } else {
          this.messageService.showMessage("Bir hata oluştu lütfen tekrar giriş yapınız.", { iconType: SweetIconType.Warning })
          this.authService.setIsLogin(false);
          this.router.navigateByUrl("/login")
          subject.next(false);
          return subject.asObservable();
        }
      })
    })
    return subject;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/common/auth.service';
import { KeyType, StorageService } from '../services/common/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subject = new Subject<boolean>();
    const token = this.storageService.checkName(KeyType.Token)
    const user = this.storageService.checkName(KeyType.User)
    user.then(userValue => {
      token.then((tokenValue) => {
        if (userValue && tokenValue) {
          this.authService.setIsLogin(true);
          subject.next(true);
          subject.complete();
          return subject.asObservable();
        } else {
          this.authService.setIsLogin(false);
          this.router.navigateByUrl("/login")
          subject.next(false);
        }
      })
    })
    return subject;
  }
  async checkIsLogin() {

  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RoleService } from '../services/common/role.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {
  constructor(
    private roleService: RoleService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let subject = new Subject<boolean>();
    let isAdmin = this.roleService.isAdmin;
    let isTeacher = this.roleService.isTeacher;
    console.log(isAdmin)
    if(isAdmin || isTeacher){
      return true;
    }
    return false;
  }

}

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../services/common/role.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminAndTeacherGuard implements CanActivate {
  constructor(
    private roleService: RoleService,
    private location: Location
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAdmin = this.roleService.isAdmin;
    let isTeacher = this.roleService.isTeacher;
    if (isAdmin || isTeacher) {
      return true;
    } else {
      this.location.back();
    }
    return false;
  }

}

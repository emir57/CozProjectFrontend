import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../services/common/role.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTeacherRoleGuard implements CanActivate {
  constructor(
    private roleService: RoleService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isTeacher = this.roleService.isTeacher;
    if (isTeacher) {
      return true;
    }
    return false;
  }

}

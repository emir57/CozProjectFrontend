import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  async getUserRoles() {
    const user: LoginedUser = JSON.parse(await this.storageService.checkName(KeyType.User))
    let url = `${this.baseUrl}api/users/getroles?userId=${user.id}`;
    return this.http.get<string[]>(url);
  }
}

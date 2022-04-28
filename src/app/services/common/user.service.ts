import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { User } from 'src/app/models/tables/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll() {
    let url = `${this.baseUrl}api/users/getall`;
    
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseListModel from 'src/app/models/responseListModel';
import ResponseModel from 'src/app/models/responseModel';
import { User } from 'src/app/models/tables/user';
import { SweetalertService, SweetIconType } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private messageService: SweetalertService
  ) { }

  getAll(successCallback: (users: User[]) => void, errorCallBack: (err: any) => void) {
    let url = `${this.baseUrl}api/users/getall`;
    this.http.get<ResponseListModel<User>>(url).subscribe(response => {
      if (response.success) {
        successCallback(response.data);
      }
    }, (responseErr) => {
      this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
      errorCallBack(responseErr);
    })
  }

}

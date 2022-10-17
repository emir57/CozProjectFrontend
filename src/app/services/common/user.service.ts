import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UpdateUserAdmin } from 'src/app/models/admin/updateUserAdmin';
import ResponseListModel from 'src/app/models/responseListModel';
import ResponseModel from 'src/app/models/responseModel';
import ResponseSingleModel from 'src/app/models/responseSingleModel';
import { UpdateUserModel } from 'src/app/models/tables/updateUserModel';
import { User } from 'src/app/models/tables/user';
import { UserResetPasswordModel } from 'src/app/models/tables/userResetPasswordModel';
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
    let url = `${this.baseUrl}api/users`;
    this.http.get<ResponseListModel<User>>(url).subscribe(response => {
      if (response.success) {
        successCallback(response.data);
      }
    }, (responseErr) => {
      this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
      errorCallBack(responseErr);
    })
  }

  updateProfile(updateUserModel: UpdateUserModel, errorCallBack?: (responseErr) => void, successCallBack?: (response: ResponseModel) => void) {
    let url = `${this.baseUrl}api/users/updateprofile`;
    this.http.post<ResponseModel>(url, updateUserModel).subscribe(response => {
      if (response.success) {
        successCallBack(response);
      }
    }, responseErr => {
      errorCallBack(responseErr);
    })
  }
  resetPassword(userResetPasswordModel: UserResetPasswordModel, errorCallBack?: (responseErr) => void, successCallBack?: (response: ResponseModel) => void) {
    let url = `${this.baseUrl}api/users/resetpassword`;
    this.http.post<ResponseModel>(url, userResetPasswordModel).subscribe(response => {
      if (response.success) {
        successCallBack(response);
      }
    }, responseErr => {
      errorCallBack(responseErr);
    })
  }

  getById(userId: number) {
    let newUrl = `${this.baseUrl}api/users/${userId}`;
    return this.http.get<ResponseSingleModel<UpdateUserAdmin>>(newUrl);
  }
  updateUserAdmin(user: UpdateUserAdmin) {
    let newUrl = `${this.baseUrl}api/users/updateuseradmin`;
    return this.http.post<ResponseModel>(newUrl, user);
  }

}

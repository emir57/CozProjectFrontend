import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseListModel from 'src/app/models/responseListModel';
import { AnswerModel } from 'src/app/models/tables/answerModel';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll(
    successCallBack?: (response: ResponseListModel<AnswerModel>) => void,
    errorCallBack?: (responseErr: HttpErrorResponse) => void) {
    let url = `${this.baseUrl}api/answers/getall`;
    this.http.get<ResponseListModel<AnswerModel>>(url).subscribe(
      (response) => {
        successCallBack(response);
      },
      (responseErr) => {
        errorCallBack(responseErr);
      }
    );
  }
}

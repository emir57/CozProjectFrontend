import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseListModel from 'src/app/models/responseListModel';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  async getAll(
    successCallBack?: (response: ResponseListModel<AnswerModel>) => void,
    errorCallBack?: (responseErr: HttpErrorResponse) => void) {
    await this.loadingService.showLoading();
    let url = `${this.baseUrl}api/answers/getall`;
    this.http.get<ResponseListModel<AnswerModel>>(url).subscribe(
      async (response) => {
        successCallBack(response);
        await this.loadingService.closeLoading();
      },
      async (responseErr) => {
        errorCallBack(responseErr);
        await this.loadingService.closeLoading();
      }
    );
  }
}

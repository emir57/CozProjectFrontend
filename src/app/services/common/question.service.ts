import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseListModel from 'src/app/models/responseListModel';
import ResponseModel from 'src/app/models/responseModel';
import { QuestionModel } from 'src/app/models/tables/questionModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getall() {
    let url = `${this.baseUrl}}api/questions/getall`;
    return this.http.get<ResponseListModel<QuestionModel>>(url);
  }
  getallWithAnswers() {
    let url = `${this.baseUrl}}api/questions/getallwithanswers`;
    return this.http.get<ResponseListModel<QuestionModel>>(url);
  }
  add(questionModel: QuestionModel) {
    let url = `${this.baseUrl}}api/questions/add`;
    return this.http.post<ResponseModel>(url,questionModel);
  }
}
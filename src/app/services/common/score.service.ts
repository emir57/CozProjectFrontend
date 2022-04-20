import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import ResponseModel from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
  ) { }

  updateScore(updateScoreModel: UpdateScoreModel) {
    let url = `${this.baseUrl}api/users/updatescore`;
    return this.http.post<ResponseModel>(url, updateScoreModel);
  }
}

export interface UpdateScoreModel {
  userId: number;
  questionId: number;
  result: boolean;
  score: number;
}

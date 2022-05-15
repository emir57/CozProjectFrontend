import { Component, OnInit } from '@angular/core';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { AnswerService } from 'src/app/services/common/answer.service';
import { LoadingService } from 'src/app/services/common/loading.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {


  answers: AnswerModel[]
  constructor(
    private loadingService: LoadingService,
    private answerService: AnswerService
  ) { }

  ngOnInit() {
    this.getAnswers();
  }

  async getAnswers() {
    this.loadingService.showLoading("yükleniyor");
    this.answerService.getAll(
      async (response) => {
        if (response.success) {
          this.answers = response.data;
          await this.loadingService.closeLoading();
        }
      },
      async (responseErr) => {
        console.log(responseErr)
        await this.loadingService.closeLoading();
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/tables/questionModel';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionService } from 'src/app/services/common/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  questions: QuestionModel[] = [];
  constructor(
    private questionService: QuestionService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.loadingService.showLoading("Yükleniyor..");
    this.questionService.getallWithAnswers().subscribe(response => {
      if (response.success) {
        this.questions = response.data;
        this.loadingService.closeLoading();
      }
    })
  }

}

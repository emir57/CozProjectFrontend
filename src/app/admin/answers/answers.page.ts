import { Component, OnInit } from '@angular/core';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { AnswerService } from 'src/app/services/common/answer.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionService } from 'src/app/services/common/question.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {


  answers: AnswerModel[]
  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.getAnswers();
  }

  async getAnswers() {
    await this.answerService.getAll(
      (response) => {
        if (response.success) {
          this.answers = response.data;
          this.answers.forEach(answer => {
            this.questionService.getById(answer.questionId).subscribe(response => {
              answer.question = response.data;
            })
          })
        }
      },
      (responseErr) => {
        console.log(responseErr)
      }
    )
  }

}

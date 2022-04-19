import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import LoginedUser from '../models/auth/loginedUserModel';
import { CategoryModel } from '../models/tables/categoryModel';
import { QuestionModel } from '../models/tables/questionModel';
import { QuestionService } from '../services/common/question.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';
import { AnswerModel } from "../models/tables/answerModel";
@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  choosedAnswer: AnswerModel;
  currentQuestion: QuestionModel;
  questions: QuestionModel[] = [];
  @Input() user: LoginedUser;
  @Input() category: CategoryModel
  constructor(
    private modalController: ModalController,
    private messageService: SweetalertService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }
  setChooseAnswer(answer: AnswerModel) {
    this.choosedAnswer = answer;
  }

  checkAnswer() {
    if (!this.choosedAnswer) {
      this.messageService.showMessage("Lütfen cevap seçiniz", { iconType: SweetIconType.Warning, time: 1000 })
    }
    console.log(this.choosedAnswer)
    this.choosedAnswer = undefined;
  }

  getQuestions() {
    this.questionService.getallWithAnswersByUserId(this.user.id).subscribe(response => {
      if (response.success) {
        this.questions = response.data;
        this.currentQuestion = this.questions[0];
      }
    })
  }


  async dismiss() {
    await this.modalController.dismiss();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import LoginedUser from '../models/auth/loginedUserModel';
import { CategoryModel } from '../models/tables/categoryModel';
import { QuestionModel } from '../models/tables/questionModel';
import { QuestionService } from '../services/common/question.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';
import { AnswerModel } from "../models/tables/answerModel";
import { ScoreService, UpdateScoreModel } from '../services/common/score.service';
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
    private questionService: QuestionService,
    private scoreService: ScoreService
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
    let updateScoreModel: UpdateScoreModel = {
      userId: this.user.id,
      questionId: this.currentQuestion.id,
      result: this.choosedAnswer.isTrue,
      score: this.currentQuestion.score
    }
    this.scoreService.updateScore(updateScoreModel).subscribe(response=>{

    });
    this.choosedAnswer = undefined;
  }

  getQuestions() {
    this.questionService.getallWithAnswersByUserId(this.user.id).subscribe(response => {
      if (response.success) {
        this.questions = response.data;
        this.currentQuestion = this.questions[0];
        console.log(response.data)
      }
    })
  }

  getTrueAnswer(){
    return this.currentQuestion.answers.find(a=>a.isTrue);
  }
  async dismiss() {
    await this.modalController.dismiss();
  }

}

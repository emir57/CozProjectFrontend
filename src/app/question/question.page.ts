import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import LoginedUser from '../models/auth/loginedUserModel';
import { CategoryModel } from '../models/tables/categoryModel';
import { QuestionModel } from '../models/tables/questionModel';
import { QuestionService } from '../services/common/question.service';
import { SweetalertService, SweetIconType } from '../services/common/sweetalert.service';
import { AnswerModel } from "../models/tables/answerModel";
import { ScoreService, UpdateScoreModel } from '../services/common/score.service';
import * as signalR from "@microsoft/signalr";
import { AlertService } from '../services/common/alert-service.service';
import { KeyType, StorageService } from '../services/common/storage.service';
declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {


  score: number = 0;
  signalRHubConnection: signalR.HubConnection;
  currentQuestionIndex = 0;
  choosedAnswer: AnswerModel;
  currentQuestion: QuestionModel;
  questions: QuestionModel[] = [];
  @Input() user: LoginedUser;
  @Input() category: CategoryModel
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private modalController: ModalController,
    private messageService: SweetalertService,
    private questionService: QuestionService,
    private scoreService: ScoreService,
    private alertService: AlertService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.score = this.user.score
    this.getQuestions();
    this.connectHub();
  }
  setChooseAnswer(answer: AnswerModel) {
    this.choosedAnswer = answer;
  }
  connectHub() {
    this.signalRHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}scorehub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build()
    this.signalRHubConnection.start()
      .then(() => console.log("Connected"))
      .catch(() => this.messageService.showMessage("Bağlantı Sağlanamadı", { iconType: SweetIconType.Error }))
  }
  getScore() {
    this.signalRHubConnection.on("SendScore", (userId: number, score: number) => {
      if (this.user.id == userId) {
        this.score = score;
      }
    });
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
    this.scoreService.updateScore(updateScoreModel).subscribe(response => {

    });
    this.getScore();
    this.choosedAnswer = undefined;
    this.nextQuestion();
  }

  getQuestions() {
    this.questionService.getByCategoryIdWithAnswersByUserId(this.category.id, this.user.id).subscribe(response => {
      if (response.success) {
        this.questions = response.data;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.questions.forEach(question => {
          question.answers.sort((x, y) => 0.5 - Math.random());
        })
      }
    })
  }
  prevQuestion() {
    this.currentQuestionIndex--;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
  nextQuestion() {
    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  getTrueAnswer() {
    return this.currentQuestion.answers.find(a => a.isTrue);
  }
  async dismiss() {
    this.alertService.showAlertConfirm(
      "Kapatmak üzeresiniz\nMerak etmeyin değişiklikleriniz kaydedilecek",
      "Uyarı!",
      () => { },
      async () => {
        this.user.score = this.score;
        this.storageService.setName(KeyType.User, this.user);
        await this.modalController.dismiss();
      })
  }

  addScore(addedScore: number) {
    let i = 0;
    setTimeout(() => {
      var interval = setInterval(() => {
        $("#animatescore").html("+" + i);
        if (i == addedScore) {
          clearInterval(interval);
          i = 0;
        }
        i++;
      }, 70)
    }, 200);
    $("#score").css("opacity", ".5");
    $("#animatescore").fadeIn(500);
    $("#animatescore").animate({
      top: "-10px"
    }, 300);
    setTimeout(() => {
      $("#animatescore").fadeOut();
      $("#score").css("opacity", "1");
      $("#animatescore").animate({
        top: "0px"
      }, 0);
    }, 700);
  }
}

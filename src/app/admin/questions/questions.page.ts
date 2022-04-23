import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { QuestionModel } from 'src/app/models/tables/questionModel';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionService } from 'src/app/services/common/question.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { QuestionSavePage } from '../question-save/question-save.page';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  questions: QuestionModel[] = [];
  user: LoginedUser;
  constructor(
    private questionService: QuestionService,
    private loadingService: LoadingService,
    private modalController: ModalController
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
        this.questions.forEach(question => {
          question.answers.sort((x, y) => 0.5 - Math.random());
        })
      }
    })
  }
  async editQuestion(question: QuestionModel) {
    const modal = await this.modalController.create({
      component: QuestionSavePage,
      componentProps: { question: question}
    })
    modal.onDidDismiss().then(()=>{
      this.getQuestions();
    })
    return await modal.present();
  }


  checkisTrue(answer: AnswerModel) {
    return answer.isTrue ? "text-success" : "";
  }

}

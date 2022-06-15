import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { AnswerService } from 'src/app/services/common/answer.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { UserService } from 'src/app/services/common/user.service';
import { QuestionSavePage } from '../../question-save/question-save.page';

@Component({
  selector: 'app-admin-answer',
  templateUrl: './admin-answer.component.html',
  styleUrls: ['./admin-answer.component.scss'],
})
export class AdminAnswerComponent implements OnInit {

  @Input() answer: AnswerModel;
  user: LoginedUser;
  constructor(
    private modalController: ModalController,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    await this.getUser();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  async goQuestionPage(answer: AnswerModel) {
    if (!this.user) {
      return;
    }
    const modal = await this.modalController.create({
      component: QuestionSavePage,
      componentProps: { question: answer.question, user: this.user }
    })

    return await modal.present();
  }

}

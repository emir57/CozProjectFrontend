import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { AnswerService } from 'src/app/services/common/answer.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionSavePage } from '../../question-save/question-save.page';

@Component({
  selector: 'app-admin-answer',
  templateUrl: './admin-answer.component.html',
  styleUrls: ['./admin-answer.component.scss'],
})
export class AdminAnswerComponent implements OnInit {

  @Input() answer: AnswerModel;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async goQuestionPage(answer: AnswerModel) {
    const modal = await this.modalController.create({
      component: QuestionSavePage,
      componentProps: { question: answer.question, user: 2 }
    })

    return await modal.present();
  }

}

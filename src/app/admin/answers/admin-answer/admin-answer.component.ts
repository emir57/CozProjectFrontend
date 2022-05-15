import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { AnswerService } from 'src/app/services/common/answer.service';
import { LoadingService } from 'src/app/services/common/loading.service';

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

  goQuestionPage(answer: AnswerModel) {

  }

}

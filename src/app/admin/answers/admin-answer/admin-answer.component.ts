import { Component, OnInit } from '@angular/core';
import { AnswerModel } from 'src/app/models/tables/answerModel';
import { LoadingService } from 'src/app/services/common/loading.service';

@Component({
  selector: 'app-admin-answer',
  templateUrl: './admin-answer.component.html',
  styleUrls: ['./admin-answer.component.scss'],
})
export class AdminAnswerComponent implements OnInit {

  answers: AnswerModel[]
  constructor(
    private loadingService: LoadingService,
  ) { }

  ngOnInit() { }

  getAnswers() {

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/tables/questionModel';

@Component({
  selector: 'app-question-save',
  templateUrl: './question-save.page.html',
  styleUrls: ['./question-save.page.scss'],
})
export class QuestionSavePage implements OnInit {

  @Input() question: QuestionModel;
  constructor() { }

  ngOnInit() {
    console.log(this.question)
  }

}

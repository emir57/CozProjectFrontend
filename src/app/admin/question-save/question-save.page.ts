import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QuestionModel } from 'src/app/models/tables/questionModel';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-question-save',
  templateUrl: './question-save.page.html',
  styleUrls: ['./question-save.page.scss'],
})
export class QuestionSavePage implements OnInit {

  questionForm: FormGroup;
  @Input() question: QuestionModel;
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: SweetalertService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.question)
  }

  createQuestionForm() {

  }

  save() {

  }

  add(questionModel: QuestionModel) {

  }
  update(questionModel: QuestionModel) {

  }

}

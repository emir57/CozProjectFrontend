import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import LoginedUser from '../models/auth/loginedUserModel';
import { CategoryModel } from '../models/tables/categoryModel';
import { QuestionModel } from '../models/tables/questionModel';
import { QuestionService } from '../services/common/question.service';
import { SweetalertService } from '../services/common/sweetalert.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

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

  getQuestions() {
    this.questionService.getallWithAnswersByUserId(this.user.id).subscribe(response => {
      if (response.success) {
        this.questions = response.data;
        console.log(this.questions)
      }
    })
  }

}

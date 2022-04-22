import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { QuestionModel } from 'src/app/models/tables/questionModel';
import { AlertService } from 'src/app/services/common/alert-service.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionService } from 'src/app/services/common/question.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-question-save',
  templateUrl: './question-save.page.html',
  styleUrls: ['./question-save.page.scss'],
})
export class QuestionSavePage implements OnInit {

  questionForm: FormGroup;
  @Input() question: QuestionModel;
  @Input() user: LoginedUser;
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: SweetalertService,
    private router: Router,
    private modalController: ModalController,
    private alertService: AlertService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    console.log(this.user)
    this.createQuestionForm();
  }

  createQuestionForm() {
    this.questionForm = this.formBuilder.group({
      id: [],
      content: ["", [Validators.required, Validators.maxLength(255)]],
      teacherId: [this.user.id],
      categoryId: [0, [Validators.required]],
      score: [0, [Validators.required]]
    })
  }

  save() {
    if (this.questionForm.valid) {
      let questionModel: QuestionModel = this.questionForm.value;
      if (this.question) {
        this.update(questionModel);
      } else {
        delete questionModel.id;
        this.add(questionModel)
      }
    }
  }

  add(questionModel: QuestionModel) {

  }
  update(questionModel: QuestionModel) {

  }

  async close() {
    await this.modalController.dismiss();
  }

  async deleteQuestion() {
    this.alertService.showAlertConfirm(`Bu soruyu silemk istediğinizden emin misinizi?`,
      "Siliniyor!",
      () => { },
      () => {
        this.questionService.delete(this.question.id).subscribe(response=>{
          if(response.success){
            this.messageService.showMessage("Silme Başarılı")
            setTimeout(() => {
              this.modalController.dismiss();
            }, 1000);
          }
        })
      })
  }

}

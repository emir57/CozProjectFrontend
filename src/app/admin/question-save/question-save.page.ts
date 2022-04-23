import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { QuestionModel } from 'src/app/models/tables/questionModel';
import { AlertService } from 'src/app/services/common/alert-service.service';
import { CategoryService } from 'src/app/services/common/category.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { QuestionService } from 'src/app/services/common/question.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-question-save',
  templateUrl: './question-save.page.html',
  styleUrls: ['./question-save.page.scss'],
})
export class QuestionSavePage implements OnInit {

  isOk: boolean = true;
  questionForm: FormGroup;
  @Input() question: QuestionModel;
  @Input() user: LoginedUser;
  categories: CategoryModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: SweetalertService,
    private router: Router,
    private modalController: ModalController,
    private alertService: AlertService,
    private questionService: QuestionService,
    private storageService: StorageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getUser();
    this.createQuestionForm();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
  }
  getCategories() {
    this.categoryService.getall().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
      }
    })
  }

  createQuestionForm() {
    this.questionForm = this.formBuilder.group({
      id: [0, []],
      content: ["", [Validators.required, Validators.maxLength(255)]],
      teacherId: [0, []],
      categoryId: [, [Validators.required]],
      score: [0, [Validators.required, Validators.min(1)]]
    })
  }

  save() {
    if (this.questionForm.valid) {
      this.isOk = false;
      let questionModel: QuestionModel = this.questionForm.value;
      questionModel.score = +questionModel.score;
      console.log(questionModel)
      if (this.question) {
        this.update(questionModel);
      } else {
        delete questionModel.id;
        this.add(questionModel)
      }
    }
  }

  add(questionModel: QuestionModel) {
    this.loadingService.showLoading("Ekleniyor..");
    this.questionService.add(questionModel).subscribe(response => {
      if (response.success) {
        this.messageService.showMessage(response.message);
      }
      this.isOk = true;
      this.loadingService.closeLoading();
    }, responseErr => {
      console.log(responseErr)
      if (responseErr.error.Errors) {
        for (let i = 0; i < responseErr.error.Errors.length; i++) {
          const error = responseErr.error.Errors[i];
          this.messageService.showMessage(error.ErrorMessage, { iconType: SweetIconType.Error });
        }
      }else{

      }
      this.isOk = true;
      this.loadingService.closeLoading();
    })
  }
  update(questionModel: QuestionModel) {

  }
  get content() {
    return this.questionForm.get("content");
  }
  get categoryId() {
    return this.questionForm.get("categoryId");
  }
  get score() {
    return this.questionForm.get("score");
  }

  async close() {
    await this.modalController.dismiss();
  }

  async deleteQuestion() {
    this.alertService.showAlertConfirm(`Bu soruyu silemk istediğinizden emin misinizi?`,
      "Siliniyor!",
      () => { },
      () => {
        this.questionService.delete(this.question.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage("Silme Başarılı")
            setTimeout(() => {
              this.modalController.dismiss();
            }, 1000);
          }
        })
      })
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { QuestionPage } from 'src/app/question/question.page';
import { CategoryService } from 'src/app/services/common/category.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
declare var $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  user: LoginedUser
  categories: CategoryModel[] = []
  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService,
    private modalController: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
  }

  async getCategories() {
    await this.loadingService.showLoading("Yükleniyor..");
    await this.getUser();
    this.categoryService.getallWithCheckComplete(this.user.id).subscribe(response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(async () => {
          this.animationArrows();
          await this.loadingService.closeLoading();
        }, 0);
      }
    },async responseErr=>{
      await this.storageService.removeName(KeyType.Token);
      await this.storageService.removeName(KeyType.User);

      await this.loadingService.closeLoading();
    })
  }
  checkCompleteDiv(category: CategoryModel) {
    if (category.isComplete) {
      return `
      z-index: 99;
      background-color: black;
      opacity: .3; `;
    }
  }
  checkCompleteSpan(category: CategoryModel) {
    if (category.isComplete) {
      return `
      z-index: 102;
      color:black;
      float:right;
      `;
    }
  }
  async openAnswerModal(category: CategoryModel) {
    const modal = await this.modalController.create({
      component: QuestionPage,
      componentProps: { category: category, user: this.user }
    })
    await modal.present();
  }
  animationArrows() {
    let arrows1 = $(".arrow1");
    let arrows2 = $(".arrow2");
    setInterval(() => {
      setTimeout(() => {
        arrows1.animate({
          opacity: 1
        }, 500)
        arrows2.animate({
          opacity: 1
        }, 800)
        arrows1.animate({
          opacity: 0
        }, 800)
        arrows2.animate({
          opacity: 0
        }, 500)
      }, 1000);
    })
  }

}

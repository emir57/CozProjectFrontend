import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { User } from 'src/app/models/tables/user';
import { QuestionPage } from 'src/app/question/question.page';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
declare var $: any;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Input() category: CategoryModel
  user: User;
  constructor(
    private modalController: ModalController,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    await this.getUser();
    this.animationArrows();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
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

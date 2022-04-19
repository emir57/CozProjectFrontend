import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { CategoryService } from 'src/app/services/common/category.service';
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
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
  }

  async getCategories() {
    await this.getUser();
    this.categoryService.getallWithCheckComplete(this.user.id).subscribe(response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(() => {
          this.animationArrows();
        }, 0);
      }
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
  checkCompleteSpan(category: CategoryModel){
    if (category.isComplete) {
      return `
      z-index: 102;
      color:black;
      float:right;
      `;
    }
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

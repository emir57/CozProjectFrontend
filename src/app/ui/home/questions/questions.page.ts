import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { CategoryService } from 'src/app/services/common/category.service';
declare var $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  categories: CategoryModel[] = []
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getall().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(() => {
          this.animationArrows();
        }, 0);
      }
    })
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

import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { CategoryService } from 'src/app/services/common/category.service';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: CategoryModel[] = []
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }


  async getCategories() {
    this.categoryService.getall().subscribe(async response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(() => {
          this.animationArrows();
        }, 0);
      }
    })
  }

  categoryEditPage() {

  }
  getBgColor(category: CategoryModel) {
    console.log(category.backgroundColor)
    return "background-color:" + category.backgroundColor + ";";
  }
  getTextColor(category: CategoryModel) {
    return "color:" + category.textColor + ";"
  }

  animationArrows() {
    let arrows1 = $(".arrow1");
    let arrows2 = $(".arrow2");
    setInterval(() => {
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
    })
  }
}

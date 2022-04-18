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


  getCategories() {
    this.categoryService.getall().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(() => {
          this.animationArrows();
        }, 0);
      }
    }, responseErr => { },
    () => {

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

  async animationArrows() {
    let arrows1 = $(".arrow1");
    let arrows2 = $(".arrow2");
    console.log(arrows2)
    arrows2.animate({
      opacity: 0
    })

    arrows1.animate({
      opacity: 1
    })
  }
}

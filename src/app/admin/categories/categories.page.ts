import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { CategoryService } from 'src/app/services/common/category.service';
import { CategorySavePage } from '../category-save/category-save.page';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: CategoryModel[] = []
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getCategories();
  }


  async getCategories() {
    this.categoryService.getall().subscribe(async response => {
      if (response.success) {
        this.categories = response.data;
        setTimeout(() => {

        }, 0);
      }
    })
  }
  getBgColor(category: CategoryModel) {
    console.log(category.backgroundColor)
    return "background-color:" + category.backgroundColor + ";";
  }
  getTextColor(category: CategoryModel) {
    return "color:" + category.textColor + ";"
  }

}

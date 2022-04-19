import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { CategoryService } from 'src/app/services/common/category.service';

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
      }
    })
  }

}

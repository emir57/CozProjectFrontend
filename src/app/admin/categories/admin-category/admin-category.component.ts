import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/tables/categoryModel';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {

  @Input() category: CategoryModel;
  constructor() { }

  ngOnInit() { }

}

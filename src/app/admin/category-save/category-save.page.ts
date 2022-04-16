import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { CategoryService } from 'src/app/services/common/category.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.page.html',
  styleUrls: ['./category-save.page.scss'],
})
export class CategorySavePage implements OnInit {

  @Input() category: CategoryModel = undefined;
  categoryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: SweetalertService,
    private loadingService: LoadingService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [this.category?.id ?? 0, []],
      name: [this.category?.name ?? "", [Validators.required, Validators.maxLength(50)]]
    })
  }

  add() {
    if (this.categoryForm.valid) {
      let categoryModel = this.categoryForm.value;
      if (!this.category) {
        delete categoryModel.id;
        this.categoryService.add(categoryModel).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message);
          }
        }, responseErr => {
          console.log(responseErr)
          if (responseErr.error.Errors.length > 0) {
            for (let i = 0; i < responseErr.error.Errors.length; i++) {
              const error = responseErr.error.Errors[i];
              this.messageService.showMessage(error.ErrorMessage, { iconType: SweetIconType.Error })
            }
          }
        })
      } else {

      }
    }
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours}:${date.getMinutes()}`;
  }

}

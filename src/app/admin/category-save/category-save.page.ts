import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { AlertService } from 'src/app/services/common/alert-service.service';
import { CategoryService } from 'src/app/services/common/category.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.page.html',
  styleUrls: ['./category-save.page.scss'],
})
export class CategorySavePage implements OnInit {

  isOk = true;
  @Input() category: CategoryModel = undefined;
  categoryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: SweetalertService,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [this.category?.id ?? 0, []],
      name: [this.category?.name ?? "", [Validators.required, Validators.maxLength(30)]]
    })
  }

  async save() {
    if (this.categoryForm.valid) {
      this.isOk = false;
      await this.loadingService.showLoading("Ekleniyor...");
      let categoryModel: CategoryModel = this.categoryForm.value;
      if (!this.category) {
        await this.add(categoryModel);
      } else {
        await this.update(categoryModel);
      }
    }
  }

  async add(categoryModel: CategoryModel) {
    delete categoryModel.id;
    this.categoryService.add(categoryModel).subscribe(async response => {
      if (response.success) {
        this.messageService.showMessage(response.message);
      }
      await this.loadingService.closeLoading();
      this.isOk = true;
    }, async responseErr => {
      if (responseErr.error.Errors) {
        for (let i = 0; i < responseErr.error.Errors.length; i++) {
          const error = responseErr.error.Errors[i];
          this.messageService.showMessage(error.ErrorMessage, { iconType: SweetIconType.Error })
        }
      } else {
        this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
      }
      await this.loadingService.closeLoading();
      this.isOk = true;
    })
  }
  update(categoryModel: CategoryModel) {
    this.categoryService.update(categoryModel).subscribe(async response => {
      if (response.success) {
        this.messageService.showMessage(response.message);
      }
      await this.loadingService.closeLoading();
      this.isOk = true;
    }, async responseErr => {
      if (responseErr.error.Errors) {
        for (let i = 0; i < responseErr.error.Errors.length; i++) {
          const error = responseErr.error.Errors[i];
          this.messageService.showMessage(error.ErrorMessage, { iconType: SweetIconType.Error })
        }
      } else {
        this.messageService.showMessage(responseErr.error.message, { iconType: SweetIconType.Error })
      }
      await this.loadingService.closeLoading();
      this.isOk = true;
    })
  }
  deleteCategory() {
    this.alertService.showAlertConfirm(
      `"${this.category?.name}" Bu kategoriyi silmek istediğinizden emin misiniz ?`,
      "Silme işlemi",
      () => { },
      () => {
        this.categoryService.delete(this.category?.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage("Silme başarılı");
          }
        })
      })
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours}:${date.getMinutes()}`;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  chosedBackgroundColor: string = "#0275d8";
  chosedTextColor: string = "#ffffff";
  isOk = true;
  @Input() category: CategoryModel = undefined;
  categoryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: SweetalertService,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createCategoryForm();
    this.checkCateogry();
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [this.category?.id ?? 0, []],
      name: [this.category?.name ?? "", [Validators.required, Validators.maxLength(30)]],
      backgroundColor: [this.category?.backgroundColor ?? "", [Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      textColor: [this.category?.textColor ?? "", [Validators.required, Validators.maxLength(7), Validators.minLength(7)]]
    })
  }
  checkCateogry(){
    if(this.category){
      this.chosedBackgroundColor = this.category.backgroundColor;
      this.chosedTextColor = this.category.textColor;
    }
  }

  async save() {
    if (this.categoryForm.valid) {
      this.isOk = false;
      await this.loadingService.showLoading(this.category ? "Güncelleniyor...":"Ekleniyor...");
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
        this.router.navigateByUrl("/admin/categories")
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
        await this.modalController.dismiss();
        this.messageService.showMessage(response.message,{time:2000});
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
        this.messageService.showMessage(responseErr.error.Message, { iconType: SweetIconType.Error })
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
    if(dateString == null){
      return "-";
    }
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  get name() {
    return this.categoryForm.get("name");
  }
  get backgroundColor() {
    return this.categoryForm.get("backgroundColor");
  }
  get textColor() {
    return this.categoryForm.get("textColor");
  }

  getExampleStyle() {
    return `width: 100%;height: 50px;color:${this.chosedTextColor};background-color: ${this.chosedBackgroundColor};`;
  }

  closeModal() {
    this.modalController.dismiss();
  }

}

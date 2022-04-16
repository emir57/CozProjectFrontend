import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/tables/categoryMode';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';

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
    private loadingService: LoadingService
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

  add(){
    if(this.categoryForm.valid){
      let categoryModel = this.categoryForm.value;
      if(!this.category) delete categoryModel.id;

    }
  }

}

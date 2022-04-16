import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/common/loading.service';
import { SweetalertService } from 'src/app/services/common/sweetalert.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.page.html',
  styleUrls: ['./category-save.page.scss'],
})
export class CategorySavePage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: SweetalertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

}

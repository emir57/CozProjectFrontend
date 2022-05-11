import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import LoginedUser from 'src/app/models/auth/loginedUserModel';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { QuestionPage } from 'src/app/question/question.page';
import { CategoryService } from 'src/app/services/common/category.service';
import { LoadingService } from 'src/app/services/common/loading.service';
import { KeyType, StorageService } from 'src/app/services/common/storage.service';
import { SweetalertService, SweetIconType } from 'src/app/services/common/sweetalert.service';
declare var $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  user: LoginedUser
  categories: CategoryModel[] = []
  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private router: Router,
    private messageService: SweetalertService
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
  }

  async getCategories() {
    await this.loadingService.showLoading("Yükleniyor..");
    await this.getUser();
    this.categoryService.getallWithCheckComplete(this.user.id).subscribe(response => {
      if (response.success) {
        this.categories = response.data;
        // setTimeout(async () => {
        //   this.animationArrows();
        //   await this.loadingService.closeLoading();
        // }, 0);
      }
    }, async responseErr => {
      await this.storageService.removeName(KeyType.Token);
      await this.storageService.removeName(KeyType.User);
      await this.loadingService.closeLoading();
      this.messageService.showMessage("Bir hata oluştu lütfen tekrar giriş yapınız", { iconType: SweetIconType.Warning })
      this.router.navigateByUrl("/login");
    })
  }
}

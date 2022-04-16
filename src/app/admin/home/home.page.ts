import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  listCategoryPage() {
    this.router.navigateByUrl("/admin/categories");
  }

  listQuestionPage() {
    this.router.navigateByUrl("/admin/questions");
  }

  listAnswerPage() {
    this.router.navigateByUrl("/admin/answers");
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit() {

  }
  isAdmin() {
    return this.roleService.isAdmin;
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
  listUserPage() {
    this.router.navigateByUrl("/admin/users");
  }

  addCategoryPage() {
    this.router.navigateByUrl("/admin/category-save");
  }
  addQuestionPage() {
    this.router.navigateByUrl("/admin/question-save");
  }
  addAnswerPage() {
    this.router.navigateByUrl("/admin/answer-save");
  }
  addUserPage() {
    this.router.navigateByUrl("/admin/user-save");
  }

}

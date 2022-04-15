import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { KeyType, StorageService } from './services/common/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkIsLogin();
  }

  async checkIsLogin() {
    const token = await this.storageService.checkName(KeyType.Token)
    const user = await this.storageService.checkName(KeyType.Token)
    if (!user || !token) {
      this.router.navigateByUrl("/login");
    } else {
      this.authService.setIsLogin(true);
      this.router.navigateByUrl("/home/questions");
    }
  }
}

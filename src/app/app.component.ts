import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { StorageService } from './services/common/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {

  }
}

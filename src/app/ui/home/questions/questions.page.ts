import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }
  openMenu(){
    this.menu.enable(true,"first")
    this.menu.open("first");
  }

}

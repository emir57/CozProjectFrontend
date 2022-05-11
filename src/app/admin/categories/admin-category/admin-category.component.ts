import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/tables/categoryModel';
import { CategorySavePage } from '../../category-save/category-save.page';
declare var $: any;

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit,AfterViewInit {

  @Input() category: CategoryModel;
  @Output() getCategories: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private modalController: ModalController
  ) { }

  ngAfterViewInit(): void {
    this.animationArrows();
  }

  ngOnInit() {}

  async categoryEditPage(category: CategoryModel) {
    const modal = await this.modalController.create({
      component: CategorySavePage,
      componentProps: { category: category }
    })
    modal.onDidDismiss().then((value) => {
      if(value.data){
        this.getCategories.emit();
      }
    })
    return await modal.present();
  }

  animationArrows() {
    let arrows1 = $(".arrow1");
    let arrows2 = $(".arrow2");
    setInterval(() => {
      setTimeout(() => {
        arrows1.animate({
          opacity: 1
        }, 500)
        arrows2.animate({
          opacity: 1
        }, 800)
        arrows1.animate({
          opacity: 0
        }, 800)
        arrows2.animate({
          opacity: 0
        }, 500)
      }, 1000);
    })
  }
}

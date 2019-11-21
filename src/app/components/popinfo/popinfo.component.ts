import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  items: [];
  redirect: [];
 
  constructor(private navParams: NavParams, private popCrtl: PopoverController, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.table(this.navParams);
    this.items = this.navParams.data.Nombre;
    this.redirect = this.navParams.data.page;
  }

  pasarPage(){
    this.popCrtl.dismiss();
    
  }
  async openImage(){
    this.popCrtl.dismiss();
    let modal = await this.modalCtrl.create({
      component: PreviewModalComponent, 
      componentProps:{
        img: this.items
      }
    });
  return await modal.present();
}

}

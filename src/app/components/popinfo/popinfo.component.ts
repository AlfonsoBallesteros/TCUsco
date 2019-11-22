import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';
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
      component: ModalPage, 
      componentProps:{
        pagina: 'Denuncias'
      }
    });
  return await modal.present();
}

}

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
  page: string;
  photo: string;
  persona: string;

  show_denuncias: boolean=false;
  show_motivo: boolean=false;
  show_places: boolean=false;
 
  constructor(private navParams: NavParams, private popCrtl: PopoverController, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.table(this.navParams);
    this.items = this.navParams.data.Nombre;
    this.page= this.navParams.data.page;
    this.photo = this.navParams.data.photo;
    this.persona = this.navParams.data.persona;

    if (this.page == 'denuncias'){
      this.show_denuncias = true;
    }else if(this.page == 'motivo'){
      this.show_motivo = true;
    }else if(this.page == "places"){
      this.show_places = true;
      console.log(this.items);
    }
  }

  motivo( valor:number ){
    this.popCrtl.dismiss({
      item: valor
    });
    
  }
  async openModal(){
    this.popCrtl.dismiss();
    let modal = await this.modalCtrl.create({
      component: ModalPage, 
      componentProps:{
        pagina: 'Denunciar',
        photo: this.photo,
        persona: this.persona
      }
    });
  return await modal.present();
}

  places( valor: number){
    this.popCrtl.dismiss({
      item: valor
    });
  }
}

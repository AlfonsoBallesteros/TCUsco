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
  post: any[];
  persona: any[];

  photo: string;
  nombre: string;
  id_bad: string;
  id: string;

  show_denunciasUser: boolean = false;
  show_denuncias: boolean=false;
  show_motivo: boolean=false;
  show_places: boolean=false;
 
  constructor(private navParams: NavParams, private popCrtl: PopoverController, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.table(this.navParams);
    this.items = this.navParams.data.Nombre;
    this.page= this.navParams.data.page;
    this.post = this.navParams.data.post;
    this.persona = this.navParams.data.persona;

    if (this.page == 'denuncias'){
      this.show_denuncias = true;
    }else if(this.page == 'motivo'){
      this.show_motivo = true;
    }else if(this.page == "places"){
      this.show_places = true;
      console.log(this.items);
    }else if(this.page == 'denuncias_user'){
      this.nombre = this.navParams.data.persona;
      this.photo = this.navParams.data.photo;
      this.id_bad = this.navParams.data.id_bad;
      this.id = this.navParams.data.id._id;
      this.show_denunciasUser = true;
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
        persona: this.persona,
        post: this.post
      }
    });
  return await modal.present();
}

async openModalUser(){
  this.popCrtl.dismiss();
  let modal = await this.modalCtrl.create({
    component: ModalPage, 
    componentProps:{
      pagina: 'DenunciarUser',
      photo: this.photo,
      nombre: this.nombre,
      id_bad: this.id_bad,
      persona: this.id
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

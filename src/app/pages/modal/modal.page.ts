import { Component, OnInit} from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  comment = {
    'persona': ['andres fernadno'],
    'photo': [],
    'Comment': ['La Revolución de Febrero de 1917, que provocó la caída del Imperio ruso, tuvo como sucesor al Gobierno provisional ruso, que fue derrocado por la Revolución de Octubre, estableciéndose el Gobierno de los bolcheviques denominado Sovnarkom. A continuación, se desencadenó la guerra civil rusa que fue ganada por el nuevo régimen soviético. En diciembre de 1922 fue creada la Unión Soviética con la fusión de la República Socialista Federativa Soviética de Rusia, la República Federal Socialista Soviética de Transcaucasia, la República Socialista Soviética de Ucrania y la República Socialista Soviética de Bielorrusia. ']
  };
  pagina: string;
  show_denuncias: boolean = false;
  show_comment: boolean = false;
  persona: string;
  photo: string;
  option: string;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private popCrtl: PopoverController) { }

  ngOnInit() {
    console.log(this.navParams);
    this.pagina = this.navParams.data.pagina;
    this.comment.photo = this.navParams.data.photo;
    this.photo = this.navParams.data.photo;
    this.persona = this.navParams.data.persona;

    if(this.pagina == 'Denunciar'){
      this.show_denuncias = true;
    }else if(this.pagina == 'comentario'){
      this.show_comment = true;
    }
  }

  async select(){
    const pop = await this.popCrtl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: ['Robo', 'Acoso', 'Violencia', 'Otro'],
        page: 'motivo'
      },  
      event: event,
      mode: 'ios',
    });
    await pop.present();
    const { data } = await pop.onWillDismiss();
    this.option = data.item;
  }

  save(){
    this.modalCtrl.dismiss();
  }

  close(){
    this.modalCtrl.dismiss();
  }

}

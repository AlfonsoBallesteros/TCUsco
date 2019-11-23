import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @ViewChild('comment', {static: false}) comentar;

  comment = {
    'persona': ['Alfonso'],
    'photo': [],
    'Comment': ['Hola amor']
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

  ngAfterViewChecked() {
    if(document.body.contains(document.getElementById('comment'))){
      this.comentar.setFocus();
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

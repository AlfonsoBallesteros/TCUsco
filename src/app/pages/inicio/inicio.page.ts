import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

@Component({
  selector: 'app-inicio', 
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  colorHeart: string;
  perfil: string = "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4";
  constructor(public alertController: AlertController, private popCrtl: PopoverController) { }

  ngOnInit() {
  }

  async mostrar( event: any ){
    const pop = await this.popCrtl.create({
      component: PopinfoComponent,
      componentProps:{Nombre: ['Denunciar'], page: ['/perfil']},
      event: event,
      mode: 'ios',
    });

    return await pop.present();
  }
  coment() {
   
  }
  like() {
    
  }
}

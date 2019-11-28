import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import {myEnterAnimation} from '../../components/animations/enter';
import {myLeaveAnimation} from '../../components/animations/leave'
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: string = "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4";
  homeColor = '1px solid none';
  edit = true;
  genero = 'Masculino';
  count: number = 0;
  constructor( private actioCrtl: ActionSheetController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async Image(){
    const actionSheet = await this.actioCrtl.create({
      mode:'ios',
      buttons: [{
        text: 'Seleccionar foto de perfil',
        icon: 'images',
        handler: () => {
          console.log('Abrir explorador de imagines');
        }
      }, {
        text: 'Ver foto de perfil',
        icon: 'contact',
        handler: () => {
          this.openImage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    }
    async openImage(){
      let modal = await this.modalCtrl.create({
        component: PreviewModalComponent, 
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps:{
          img: this.perfil
        }
      });
    return await modal.present();
  }

  async Denuncias(){
    let modal = await this.modalCtrl.create({
      component: ModalPage, 
      mode:'ios',
      componentProps:{
        pagina:'Denuncias',
        id:'1',
        photo: this.perfil
      }
    });
  return await modal.present();
  }

  Editar(event){
   if(event && this.count < 1){
    this.edit = false;
    this.homeColor = '1px solid #7044ff';
    this.count++;
   }else{
    this.edit = true;
    this.homeColor = '1px solid #f4f5f8';
    this.count = 0;
   }
  }

  Guardar(){
    this.edit = true;
    this.homeColor = '1px solid #f4f5f8';
  }

}

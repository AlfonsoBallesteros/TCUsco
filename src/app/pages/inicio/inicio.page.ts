import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-inicio', 
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  post = {
    'photo_uri': "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4",
    'nombre': 'Alfonso Ballesteros',
    'descripcion': 'Aca va al descripcion del trayecto o servicio',
    'lugar': 'Usco',
    'fecha': '10/10/2019',
    'like': 8,
    'comentarios': 5
  }
  colorHeart: string = "medium";  
  count: number = 1;  

  show: boolean=false;
  constructor(public alertController: AlertController, private popCrtl: PopoverController, private modalCrtl: ModalController) { }

  ngOnInit() {
    if(this.post.comentarios > 0){
      this.show = true;
    }else{
      this.show = false;
    }
  }

  async mostrar( event: any ){
    const pop = await this.popCrtl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: ['Denunciar'],
        page: 'denuncias',
        photo: this.post.photo_uri,
        persona: this.post.nombre
      },
      event: event,
      mode: 'ios',
    });

    return await pop.present();
  }
  async coment() {
    let modal = await this.modalCrtl.create({
      component: ModalPage, 
      componentProps:{
        pagina: 'comentario',
        photo: this.post.photo_uri
      }
    });
  return await modal.present();
  }
  
  like( event: any) {
    
    if(event && this.count == 1){
      this.colorHeart = "danger";
      this.post.like += 1
      this.count += 1
    }else{
      this.post.like -= 1;
      this.colorHeart = "medium";
      this.count = 1;
    }
  }

  async modalCreate(){
    let modal = await this.modalCrtl.create({
      component: ModalPage, 
      componentProps:{
        pagina: 'post' 
      }
    });
  return await modal.present();
  }
}

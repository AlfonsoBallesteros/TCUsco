import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { myLeaveAnimation } from 'src/app/components/animations/leave';
import { myEnterAnimation } from 'src/app/components/animations/enter';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuarios } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.page.html',
  styleUrls: ['./perfil-user.page.scss'],
})
export class PerfilUserPage implements OnInit {

  id: string;
  user: Usuarios = {};
  usuario: Usuarios = {}
  age: number;
  constructor(private active: ActivatedRoute, private modalCtrl: ModalController, private userService: UsuarioService) { }

  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get('id');
    this.userService.getOneUser(this.id)
    .subscribe( res =>{
        this.user = res
        console.log(this.user);
    });
    this.usuario = this.userService.getUsuario();
    console.log(this.user);
    
  }
  ionViewDidEnter(){
    this.ageCalculator();
  }
  ageCalculator(){
    if(this.user.date_nacimiento){
      const convertAge = new Date(this.user.date_nacimiento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      console.log('edad',this.age);
    }
  }


  async openImage(){
    let modal = await this.modalCtrl.create({
      component: PreviewModalComponent, 
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps:{
        img: ''
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
      persona: this.user,
      user: this.usuario.rol
    }
  });
return await modal.present();
}

}

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  data: any[];
  isItemAvailable = false;
  usuario = 
    {
    'name': 'Juan Sebastian',
    'photo': 'https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4',
    'like': 5,
    'ocupacion': 'Estudiante'
    }

  carrera: any[];
  show_texto = true;  

  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {
    setTimeout(() =>{
      this.show_texto = false;
      this.carrera = [ 'Ingenieria de software' , 'Ingenieria de software', 'Lic. Matematicas'];
    }, 2000)
  }

  async denuncia(){
    const pop = await this.popCtrl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: ['Denunciar'],
        page: 'denuncias',
        photo: this.usuario.photo,
        persona: this.usuario.name
      },
      event: event,
      mode: 'ios',
    });

    return await pop.present();
  }

  doRefresh(event: any){
    setTimeout(() =>{
      this.go();
      event.target.complete();
    }, 1500)
  }

  go(){
    this.data.length++;
  }

}

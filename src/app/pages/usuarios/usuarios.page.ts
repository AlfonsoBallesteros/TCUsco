import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuarios } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  data: any[];
  isItemAvailable = false;
  data_texto: any[] = Array(10);
  
  usuario = 
    {
    'name': 'Juan Sebastian',
    'photo': 'https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4',
    'like': 5,
    'ocupacion': 'Estudiante'
    }

  carrera: any[];
  show_texto = true;  
  usuarios: any[]= [];
  user: Usuarios = {};
  itemBuscar: any[];
  filtroBuscar: string = '';

  constructor(private popCtrl: PopoverController, private usuarioServicio: UsuarioService) {}

  ngOnInit() {
    setTimeout(() =>{
      this.show_texto = false;
      this.carrera = [ 'Ingenieria de software' , 'Ingenieria de petroleos', 'Lic. Matematicas'];
      this.usuarioServicio.getAllUsers()
      .subscribe( res =>{
        for (const data of (res as any)) {
          this.usuarios.push({
            _id: data._id,
            photo: data.photo,
            full_name: data.first_name + ' ' + data.last_name,
            ocupacion: data.ocupacion,
            carrera: data.carrera,
            like: data.like
          });
        }
        console.log(this.usuarios);
        
      });
    }, 1000)
    this.usuarioInitializer();
    this.user = this.usuarioServicio.getUsuario();
    console.log(this.user);
  }

  async denuncia(event: any, user){
    console.log(user)
    const pop = await this.popCtrl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: ['Denunciar'],
        page: 'denuncias',
        photo: user.photo,
        persona: user.first_name,
        apellido: user.last_name,
        id: user._id
      },
      event: event,
      mode: 'ios',
    });

    return await pop.present();
  }

  usuarioInitializer(){
    this.itemBuscar = this.usuarios;
  }

  doRefresh(event: any){
    setTimeout(() =>{
      event.target.complete();
    }, 1000)
  }

  buscar(event){
    this.usuarioInitializer();
    const val = event.target.value;

    if (!val) {
      return;
    }

    this.itemBuscar = this.itemBuscar.filter(data => {
      if (data.full_name && val) {
        if (data.full_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  go(){
    this.data.length++;
  }

}

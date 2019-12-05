import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController, ModalController, NavParams, IonInfiniteScroll, Events} from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { ModalPage } from '../modal/modal.page';
import { Usuarios } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-inicio', 
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  
})
export class InicioPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll, {static: false}) infinite;

  data: any[];
  page = 0;
  maximumPages = 3;

  post = {
    'photo_uri': "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4",
    'nombre': 'Alfonso Ballesteros',
    'descripcion': 'Aca va al descripcion del trayecto o servicio',
    'lugar': 'Usco',
    'fecha': '10/10/2019',
    'like': 8,
    'comentarios': 5
  }
  public nav = NavParams;
  lugar: string;
  colorHeart: string = "medium";  
  count: number = 1;  
  option: string;
  show: boolean=false;
  show_texto = true;
  usuario: Usuarios = {};
  dataMenu: object;
  constructor(public alertController: AlertController, private popCrtl: PopoverController, private modalCrtl: ModalController,private usuarioServices:UsuarioService, private Service: DataServiceService) { }

  ngOnInit() {
    if(this.post.comentarios > 0){
      this.show = true;
    }else{
      this.show = false;
    }
    //this.loadUsers();
    setTimeout(() =>{
      this.show_texto = false;
      this.data = Array(2);
    }, 1000)

    this.usuario = this.usuarioServices.getUsuario();
    console.log(this.usuario);
    this.dataPase();

  }

  dataPase(){
    this.dataMenu = {
      photo: this.usuario.photo,
      nombre: this.usuario.first_name
    }
    this.Service.changeData(this.dataMenu);
    console.log(this.dataMenu);
    this.Service.currentData.subscribe( data => console.log(data));
  }

  doRefresh(event: any){
    setTimeout(() =>{
      this.go();
      event.target.complete();
    }, 10000)
  }
  go(){
    this.data.length++;
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
      mode: 'ios',
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
        pagina: 'post',
        photo: this.post.photo_uri,
        persona: this.post.nombre
      }
    });
  modal.onDidDismiss().then((data) => {
    this.lugar = data.data.location;
    console.log(this.lugar)
  });
  return await modal.present();
  
  }

  loadUsers(event?){
    this.data = Array(10);
    /*
    if (event) {
      event.target.complete();
    }
    */
  }

  loadData(event){
    /*
    this.page++;
    this.loadUsers(event);
 
    if (this.page === this.maximumPages) {
      this.infinite.disabled = true;
    }
    */
    setTimeout(() =>{
      /*
      if(this.data.length > 10){
        event.target.complete();
        this.infinite.disabled = true;
        return;
      }
      //const nuevo = Array(5);
      //this.data.push(...nuevo);
       */
      event.target.complete();
      //this.infinite.disabled = true;
     
    }, 500)
  }
}

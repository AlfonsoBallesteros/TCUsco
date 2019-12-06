import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController, ModalController, NavParams, IonInfiniteScroll, Events} from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { ModalPage } from '../modal/modal.page';
import { Usuarios, RespuestaPosts } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { PublicacionService } from 'src/app/services/publicacion.service';

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
  posts: RespuestaPosts[] = []
  constructor(public alertController: AlertController, private popCrtl: PopoverController, private modalCrtl: ModalController,private usuarioServices:UsuarioService, private Service: DataServiceService, private postServicie: PublicacionService) { }

  ngOnInit() {
    this.postServicie.getPost()
    .subscribe( res => {
      for (const data of (res as any )){
        this.posts.unshift({
          _id: data._id,
          id_usuario: data.id_usuario['_id'],
          photo: data.id_usuario['photo'],
          first_name: data.id_usuario['first_name'],
          last_name: data.id_usuario['last_name'],
          descripcion: data.descripcion,
          lugar: data.lugar,
          ubicacion: data.ubicacion,
          like: data.like,
          createdAt: data.createdAt
        })
        console.log(res)
      }
      console.log(this.posts)
    });

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
        persona: this.usuario
      }
    });
  modal.onDidDismiss().then( () => this.ngOnInit());
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

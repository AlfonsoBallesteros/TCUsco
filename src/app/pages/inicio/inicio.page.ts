import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AlertController, PopoverController, ModalController, NavParams, IonInfiniteScroll, Events, NavController} from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { ModalPage } from '../modal/modal.page';
import { Usuarios, RespuestaPosts } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { ComentarioService } from 'src/app/services/comentario.service';

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
  contador: number = 0;
  public nav = NavParams;
  lugar: string;
  colorHeart: string = "medium";  
  count: number = 1;  
  option: string;
  show: boolean = true;
  show_texto = true;
  usuario: Usuarios = {};
  dataMenu: object;
  posts: RespuestaPosts[] = [];
  mySubscription: any;
  constructor(public alertController: AlertController, private popCrtl: PopoverController, private modalCrtl: ModalController,private usuarioServices:UsuarioService, private Service: DataServiceService, private postServicie: PublicacionService, private comment: ComentarioService, private navCrtl: NavController) { 
  }

  ngOnInit() {

    
    //this.loadUsers();
    setTimeout(() =>{
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
          createdAt: data.createdAt,
        })
      }
      console.log(this.posts)
      this.contador = this.posts.length;
      console.log(this.contador)
      for(let i in this.posts){
      this.comment.getCount(this.posts[i]._id)
        .subscribe( result => {
          this.posts[i].comentario = result;
          if(this.posts[i].comentario > 0){
            this.posts[i].show = true
          }else{
            this.posts[i].show = false
          }
        });
      }
    });
      this.show_texto = false;
      //this.data = Array(2);
    }, 500)

    

  }

  ionViewWillEnter() {
    
  }
  
  ionViewDidEnter(){
    this.usuario = this.usuarioServices.getUsuario();
    console.log(this.usuario);
    this.dataPase();
    //this.comment.getCount(this.posts['_id'])
    
  }

  ngOnDestroy(){
    if (this.posts) {
      this.posts = [];
    }
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

  doRefresh(event?){
    this.ngOnDestroy();
    this.show_texto = true;
    this.ngOnInit();
    event.target.complete();
    /*
    setTimeout(() =>{
      this.go();
      event.target.complete();
    }, 100)*/
  }
  go(){
    this.data.length++;
  }

  async mostrar( event: any, data){
    const pop = await this.popCrtl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: ['Denunciar'],
        page: 'denuncias',
        persona: this.usuario,
        post: data
      },
      event: event,
      mode: 'ios',
    });

    return await pop.present();
  }
  async coment(id) {
    this.ngOnDestroy
    console.log(id);
    let modal = await this.modalCrtl.create({
      component: ModalPage,
      mode: 'ios',
      componentProps:{
        pagina: 'comentario',
        persona: this.usuario,
        post: id
      }
    });
  modal.onDidDismiss().then( () => this.Refresh());
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
  modal.onDidDismiss().then( () => this.Refresh());
  return await modal.present();
  
  }

  Refresh(){
    this.ngOnDestroy();
    this.show_texto = true;
    this.ngOnInit();
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

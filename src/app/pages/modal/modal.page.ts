import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalController, NavParams, PopoverController, Platform, ToastController, NavController} from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { Comentarios, Denuncia, listDenuncias } from 'src/app/interfaces/interfaces';
import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  
  @ViewChild('comment', {static: false}) comentar;
  /*
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  @ViewChild('pleaseConnect',{static: false}) pleaseConnect: ElementRef;
*/
  data: any[];
  data_texto: any[] = Array(10);

  lugares: Array<string> = [];  
  lugar: string = 'Lugares'
  comment = {
    'persona': ['Alfonso'],
    'photo': [],
    'Comment': ['Mi primer comentario']
  };
  pagina: string;
  show_lista: boolean = false;
  show_denuncias: boolean = false;
  show_denunciarUser: boolean = false
  show_comment: boolean = false;
  show_post: boolean = false;
  show_texto: boolean = false;
  show_comment_texto: boolean = false;
  show_rol: boolean = false;

  //datos post
  nombre_post: string;
  apellido_post: string;
  photo_post: string;
  id_userPost: string;
  //
  //datos para comentario
  id_post: string;
  //
  //datos para listar denuncias
  rol_userDenuncia: string;
  id_userBad: string;
  usuario:string;
  //
  id_bad: string;
  persona: string;
  nombre: string;
  apellido: string
  photo: string;
  id_user: string;
  ///
  option: string = 'Seleccione';
  message: string ='';

  crear_trayecto: FormGroup;
  crear_denuncia: FormGroup;
  crear_comentario: FormGroup;
  show_error: boolean = false;
  show_option: boolean = false;

  comentario: Comentarios[] = [];

  denuncias: any[] = []

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private popCrtl: PopoverController, public platform: Platform, public zone: NgZone, public geolocation: Geolocation, private toastCrtl: ToastController, private formCrtl: FormBuilder, private PostService: PublicacionService, private router: Router, private comentService: ComentarioService, private navCrtl: NavController, private denuncia: DenunciaService) {
   }

  ngOnInit() {
    console.log(this.navParams);
    this.pagina = this.navParams.data.pagina;
    this.comment.photo = this.navParams.data.photo;
    //
  
    this.persona = this.navParams.data.persona._id;
    //recojo data post
    this.id_userPost = this.navParams.data.persona._id;
    this.nombre_post = this.navParams.data.persona.first_name;
    this.apellido_post = this.navParams.data.persona.last_name;
    this.photo_post = this.navParams.data.persona.photo
    //Recojo data para el commentario
    this.id_post = this.navParams.data.post;
    //
    //Recojo data perfil para las denuncias del usuarios
    this.rol_userDenuncia = this.navParams.data.persona.rol;
    this.id_userBad = this.navParams.data.persona._id;
    //

    console.log(this.id_post)
    //

    if(this.pagina == 'Denunciar'){
      this.id_bad = this.navParams.data.post.id_usuario;
      this.photo = this.navParams.data.post.photo;
      this.nombre = this.navParams.data.post.first_name;
      this.apellido = this.navParams.data.post.last_name;
      this.show_denuncias = true;

      this.crear_denuncia = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        motivo: new FormControl(this.option, Validators.required),
        id_usuario: new FormControl(this.persona),
        id_userBad: new FormControl(this.id_bad),
      });
      console.log(this.crear_denuncia.value);

    }else if(this.pagina == 'DenunciarUser'){
      this.id_user = this.navParams.data.persona;
      this.id_userBad = this.navParams.data.id_bad;
      this.photo = this.navParams.data.photo;
      this.nombre = this.navParams.data.nombre;
      this.show_denuncias = true;
      this.crear_denuncia = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        motivo: new FormControl(this.option, Validators.required),
        id_usuario: new FormControl(this.id_user),
        id_userBad: new FormControl(this.id_userBad),
      });
      console.log(this.crear_denuncia.value);

    }else if(this.pagina == 'comentario'){
      this.show_comment = true;
      this.show_texto = true;
      setTimeout(() =>{
        this.data = Array(20);
        this.show_texto = false;
        this.show_comment_texto = true;
      }, 500)
      
      this.crear_comentario = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        id_post: new FormControl(this.id_post),
        id_usuario: new FormControl(this.id_userPost),
      });
      this.comentService.getComment(this.id_post)
      .subscribe( res => {
        for (const data of (res as any )){
          this.comentario.unshift({
            descripcion: data.descripcion,
            id_usuario: data.id_usuario,
            photo: data.id_usuario.photo,
            first_name: data.id_usuario.first_name,
            last_name: data.id_usuario.last_name
          })
        }
        console.log(this.comentario)
      });

    }else if (this.pagina == "post"){
      this.show_post = true;
      if(this.lugares.length == 0){
        this.lugares = ['Usco', 'Agora', 'Administracion', 'Parque santander', 'Centro', 'Neiva'];
      }
      this.crear_trayecto = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        lugar: new FormControl(this.lugar, Validators.required),
        id_usuario: new FormControl(this.id_userPost),
        ubicacion: new FormControl(''),
        like: new FormControl(0),
      });

    }else if(this.pagina == 'Denuncias'){
      this.usuario = this.navParams.data.user;
      this.show_lista = true;
      this.data = Array(10);
      if(this.usuario){
        this.show_rol = true;
      }
      this.denuncia.getDenuncias(this.id_userBad)
      .subscribe( res =>{
        for (const data of (res as any )){
          this.denuncias.unshift({
            descripcion: data.descripcion,
            id_usuario: data.id_usuario,
            photo: data.id_usuario.photo,
            full_name: data.id_usuario.first_name + ' ' + data.id_usuario.last_name
          })
        }
        console.log(this.denuncias);
      })
      
    }
  }
  
  ionViewDidLoad(): void{
   if(this.pagina == 'comentario'){
    this.comentService.getComment(this.id_post)
    .subscribe( res => {
      for (const data of (res as any )){
        this.comentario.unshift({
          descripcion: data.descripcion,
          id_usuario: data.id_usuario,
          photo: data.id_usuario.photo,
          first_name: data.id_usuario.first_name,
          last_name: data.id_usuario.last_name
        })
      }
      console.log(this.comentario)
    });
   }
  }

  ngOnDestroy(){
    this.comentario = []
    
  }
  ionViewDidEnter(){
   
    if(this.pagina == "post"){

      }
       
    this.platform.ready().then(() =>{
      //this.ubicacion();
    });
}

  ngAfterViewChecked() {
    if(document.body.contains(document.getElementById('comment'))){
      this.comentar.setFocus();
    }
  }

  async places(){
    const pop = await this.popCrtl.create({
      component: PopinfoComponent,
      componentProps:{
        Nombre: this.lugares,
        page: 'places'
      },  
      event: event,
      mode: 'ios',
    });
    await pop.present();
    const { data } = await pop.onWillDismiss();
    this.lugar = data.item;
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

  save_denuncia(){
    this.crear_denuncia.value['motivo'] = this.option;
    if(this.crear_denuncia.valid == true){
      if(this.crear_denuncia.value['motivo'] == 'Seleccione'){
        this.show_option = true;
      }else{
        const denuncia = this.denuncia.postDenuncias(this.crear_denuncia.value);
        this.show_option = false;
        console.log(this.crear_denuncia.value);
        this.modalCtrl.dismiss();
        this.message = 'Se creo la denuncia exitosamente'
        this.toastMensaje();
      }
    }else{
      if(this.crear_denuncia.value['motivo'] == 'Seleccione'){
        this.show_option = true;
      }else{
        this.show_option = false;
      }
      console.log(this.crear_denuncia.value);
    }
    
  }

   async save_comentarios(){
    if(this.crear_comentario.valid){
      const creado = await this.comentService.postComment(this.crear_comentario.value);
      console.log(this.crear_comentario.value)
      this.crear_comentario.reset();
      //this.ngOnDestroy();
      this.refresh();
      //this.ngOnInit();
    }
  }

  bloquear(){
    this.message = 'Usuario Bloqueado';
    this.toastMensaje();
    this.modalCtrl.dismiss();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async crear_post(){
    this.ubicacion();
    this.crear_trayecto.value['lugar'] = this.lugar;
    if(this.crear_trayecto.valid == true){
      if(this.crear_trayecto.value['lugar'] == 'Lugares'){
        this.show_error = true;
      }else{
        const creado = await this.PostService.crearPost(this.crear_trayecto.value);
        this.show_error = false;
        this.modalCtrl.dismiss();
        this.message = 'Se creo la publicacion exitosamente';
        this.toastMensaje();
      }
      console.log(this.crear_trayecto.value);
      
    }else{
      if(this.crear_trayecto.value['lugar'] == 'Lugares'){
        this.show_error = true;
      }else{
        this.show_error = false;
      }
      console.log(this.crear_trayecto.value);
      console.log(this.crear_trayecto.valid);
    }
  }
  ubicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;
      console.log(coords);
      this.crear_trayecto.patchValue({
        ubicacion: coords
      });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
      
  }

  doRefresh(event: any){
    setTimeout(() =>{
      this.go();
      event.target.complete();
    }, 1000)
  }
  go(){
    this.data.length++;
  }

  async toastMensaje() {
    const toast = await this.toastCrtl.create({
      message: this.message,
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }

  refresh(){
    this.ngOnDestroy();
    this.ngOnInit();
    /*
    this.comentService.getComment(this.id_post)
      .subscribe( res => {
        for (const data of (res as any )){
          this.comentario.unshift({
            descripcion: data.descripcion,
            id_usuario: data.id_usuario,
            photo: data.id_usuario.photo,
            first_name: data.id_usuario.first_name,
            last_name: data.id_usuario.last_name
          })
        }
        console.log(this.comentario)
      });
      */
  }
}



/*
this.geolocation.getCurrentPosition().then((position) => {
  let request = {
        location: position, //lat: location.coords.latitude, lng: location.coords.longitude
        radius: 50,
        type: 'point_of_interest'
      };
}
return new Promise((resolve,reject)=>{
      this.placeService.nearbySearch(request, (results:any,status:any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            resolve(this.lugares[i] = results[i].name);
          }
          console.log(this.lugares)
        }else{
          reject(status);
        }
      })
  });

*/

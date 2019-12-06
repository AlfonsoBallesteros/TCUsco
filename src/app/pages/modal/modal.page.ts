import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalController, NavParams, PopoverController, Platform, ToastController} from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Router } from '@angular/router';

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
  show_comment: boolean = false;
  show_post: boolean = false;
  show_texto: boolean = false;
  show_comment_texto: boolean = false;

  //datos post
  nombre_post: string;
  apellido_post: string;
  photo_post: string;
  id_userPost: string;
  //
  persona: string;
  apellido: string
  photo: string;
  option: string = 'Seleccione';
  message: string ='';

  crear_trayecto: FormGroup;
  crear_denuncia: FormGroup;
  crear_comentario: FormGroup;
  show_error: boolean = false;
  show_option: boolean = false;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private popCrtl: PopoverController, public platform: Platform, public zone: NgZone, public geolocation: Geolocation, private toastCrtl: ToastController, private formCrtl: FormBuilder, private PostService: PublicacionService, private router: Router) {
   }

  ngOnInit() {
    console.log(this.navParams);
    this.pagina = this.navParams.data.pagina;
    this.comment.photo = this.navParams.data.photo;
    this.photo = this.navParams.data.photo;
    this.persona = this.navParams.data.persona;
    this.apellido = this.navParams.data.apellido;
    //recojo data post
    this.id_userPost = this.navParams.data.persona._id;
    this.nombre_post = this.navParams.data.persona.first_name;
    this.apellido_post = this.navParams.data.persona.last_name;
    this.photo_post = this.navParams.data.persona.photo
    console.log(this.id_userPost)
    //
    console.log(this.apellido)

    if(this.pagina == 'Denunciar'){
      this.show_denuncias = true;

      this.crear_denuncia = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        motivo: new FormControl(this.option, Validators.required),
        id_usuario: new FormControl(''),
        id_usuario_victima: new FormControl(''),
        id_publicacion: new FormControl(''),
      });

    }else if(this.pagina == 'comentario'){
      this.show_comment = true;
      this.show_texto = true;
      setTimeout(() =>{
        this.data = Array(20);
        this.show_texto = false;
        this.show_comment_texto = true;
      }, 1000)
      
      this.crear_comentario = this.formCrtl.group({
        descripcion: new FormControl('', Validators.required),
        id_publicacion: new FormControl(''),
        id_usuario: new FormControl(''),
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
      this.show_lista = true;
      this.data = Array(10);
    }
  }
  
  ionViewDidLoad(): void{
  }
  ionViewDidEnter(){
   
    if(this.pagina == "post"){

      }
       
    this.platform.ready().then(() =>{
      this.ubicacion();
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

  save_comentarios(){
    if(this.crear_comentario.valid){
      console.log(this.crear_comentario.value)
      this.crear_comentario.reset();
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

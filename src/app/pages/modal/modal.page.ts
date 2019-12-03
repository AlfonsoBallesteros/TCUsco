import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalController, NavParams, PopoverController, Platform, ToastController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  persona: string;
  photo: string;
  option: string = 'Seleccione';
  message: string ='';

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private popCrtl: PopoverController, public platform: Platform, public zone: NgZone, public geolocation: Geolocation, private toastCrtl: ToastController) {
   }

  ngOnInit() {
    console.log(this.navParams);
    this.pagina = this.navParams.data.pagina;
    this.comment.photo = this.navParams.data.photo;
    this.photo = this.navParams.data.photo;
    this.persona = this.navParams.data.persona;

    if(this.pagina == 'Denunciar'){
      this.show_denuncias = true;
    }else if(this.pagina == 'comentario'){
      this.show_comment = true;
      this.show_texto = true;
      setTimeout(() =>{
        this.data = Array(20);
        this.show_texto = false;
        this.show_comment_texto = true;
      }, 1000)
    }else if (this.pagina == "post"){
      this.show_post = true;
      if(this.lugares.length == 0){
        this.lugares = ['Usco', 'Agora', 'Administracion', 'Parque santander', 'Centro', 'Neiva'];
      }
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
      this.SearchPlaces();
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

  save(){
    this.modalCtrl.dismiss();
  }

  bloquear(){
    this.message = 'Usuario Bloqueado';
    this.toastBloqueo();
    this.modalCtrl.dismiss();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  locacion(){
    this.modalCtrl.dismiss({
      location: this.lugar
    });
    
  }
  SearchPlaces() {
  
      
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

  async toastBloqueo() {
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

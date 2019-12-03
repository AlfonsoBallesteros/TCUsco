import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import {myEnterAnimation} from '../../components/animations/enter';
import {myLeaveAnimation} from '../../components/animations/leave'
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: string = "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4";
  homeColor = '1px solid none';
  edit = true;
  genero = 'Masculino';
  count: number = 0;
  message: string = '';
  ocupacion: string = '';
  genders: Array<string>;
  ocupations: Array<string>;
  carrers: Array<string>;
  carrer: string;
  show_carrers: boolean = true;
  constructor( private actioCrtl: ActionSheetController, private modalCtrl: ModalController, private toastCrtl: ToastController) {}

  ngOnInit() {

    this.genders = [
      "Masculino",
      "Femenino",
      "Indefinido"
    ]; 
    this.ocupations = [
      "Estudiante",
      "Docente",
      "Directivo",
      "Empleado"
    ];
    
    this.carrers = [
      "Biología Aplicada",
      "Física",
      "Matemática Aplicada",
      "Tec. Acuicultura Continental",
      "Ciencia Política",
      "Derecho",
      "Comunicación Social",
      "Psicología",
      "Administración de Empresas",
      "Administración Financiera",
      "Contaduría Pública",
      "Administración Turística",
      "Economía",
      "Tecnología en Gestión Financiera",
      "Lic. Ciencias Naturales",
      "Lic. Ciencias Sociales",
      "Lic. Educación Artística y Cultural",
      "Lic. Educación Física",
      "Lic. Inglés ",
      "Lic. Literatura-Lengua Castellana ",
      "Lic. Matemáticas ",
      "Lic. Educación Infantil",
      "Tec. Obras Civiles",
      "Tec. Desarrollo de Software",
      "Ingeniería Agrícola",
      "Ingeniería Agroindustrial",
      "Ingeniería Civil",
     "Ingeniería de Petróleos",
      "Ingeniería de Software",
      "Ingeniería Electrónica",
      "Enfermería ",
     " Medicina "
    ];

    this.ocupacion = 'Estudiante';
    this.carrer = 'Ingenieria de software'
  }
  
  changeOcupation(){
    let ocupacion = ''
    if(ocupacion == 'Estudiante'){
      this.show_carrers = true;
    }else{
      this.show_carrers = false;
    }
  }

  async Image(){
    const actionSheet = await this.actioCrtl.create({
      mode:'ios',
      buttons: [{
        text: 'Seleccionar foto de perfil',
        icon: 'images',
        handler: () => {
          console.log('Abrir explorador de imagines');
        }
      }, {
        text: 'Ver foto de perfil',
        icon: 'contact',
        handler: () => {
          this.openImage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    }
    
    async openImage(){
      let modal = await this.modalCtrl.create({
        component: PreviewModalComponent, 
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps:{
          img: this.perfil
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
        id:'1',
        photo: this.perfil
      }
    });
  return await modal.present();
  }

  Editar(event){
   if(event && this.count < 1){
    this.edit = false;
    this.homeColor = '1px solid #7044ff';
    this.count++;
   }else{
    this.edit = true;
    this.homeColor = '1px solid #f4f5f8';
    this.count = 0;
   }
  }

  Guardar(){
    this.message = 'Edicion Exitosa';
    this.toastSave();
    this.edit = true;
    this.homeColor = '1px solid #f4f5f8';
  }

  async toastSave() {
    const toast = await this.toastCrtl.create({
      message: this.message,
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }

}

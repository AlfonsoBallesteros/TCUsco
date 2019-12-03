import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import {myEnterAnimation} from '../../components/animations/enter';
import {myLeaveAnimation} from '../../components/animations/leave'
import { ModalPage } from '../modal/modal.page';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  homeColor = '1px solid none';
  edit = true;
  veces: number = 0; 
  count: number = 0;
  message: string = '';
  genders: Array<string>;
  ocupations: Array<string>;
  carrers: Array<string>;
  show_carrers: boolean = true;
  edit_perfil: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  user = {
    'photo': 'https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4',
    'name': 'Alfonso Ballesteros',
    'ocupacion': 'Estudiante',
    'carrera': 'Ingenieria de software',
    'celular': '3177492167',
    'cedula': '1003815307',
    'date': '2019-11-27',
    'direccion': 'carrera 6a #3w - 16',
    'genero': 'masculino',
    'codigo': '20172161991',
    'password': '123456789'
  }

  constructor( private actioCrtl: ActionSheetController, private modalCtrl: ModalController, private toastCrtl: ToastController, private formCrtl: FormBuilder, private alertCrtl: AlertController) {}

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

    this.edit_perfil = this.formCrtl.group({
      name: new FormControl(this.user.name, Validators.required),
      ocupation: new FormControl(this.user.ocupacion, Validators.required),
      carrer: new FormControl(this.user.carrera, Validators.required),
      tel: new FormControl(this.user.celular, Validators.required),
      date: new FormControl(this.user.date, Validators.required),
      dir: new FormControl(this.user.direccion, Validators.required),
      gender: new FormControl(this.user.genero, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });

    if(this.user.ocupacion != 'Estudiante'){
      this.show_carrers = false;
    }else{
      this.show_carrers = true;
    }
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    console.log(control.root.value[field_name]);
    if(!isValid){
      return { 'equalTo': {isValid} }
    }else{ 
      return null;
      }
    };
  }

  tooglePassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  
  changeOcupation(){
    let ocupacion = this.edit_perfil.get('ocupation').value;
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
          img: this.user.photo
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
        photo: this.user.photo
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
    if(this.edit_perfil.valid == true){
      let password = this.edit_perfil.get('password').value;
      let confirm = this.edit_perfil.get('confirm_password').value;
      if(password == confirm){
        this.message = 'Edicion Exitosa';
        this.toastSave();
        this.edit = true;
        this.homeColor = '1px solid #f4f5f8';
        console.log(this.edit_perfil.value);
      }else{
        this.message = 'Contraseña no coinciden';
        this.alertError();
      }
    }else{
      if(this.veces < 1){
        this.message = 'Porfavor rellenar todos los campos';
        this.alertError();
        this.veces++;
      }else{
        this.message = 'Porfavor verificar contraseña';
        this.alertError();
        this.veces = 0;
      }
    }
  }

  async toastSave() {
    const toast = await this.toastCrtl.create({
      message: this.message,
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }

  async alertError() {
    const alert = await this.alertCrtl.create({
      header: 'Invalido',
      message: this.message,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

}

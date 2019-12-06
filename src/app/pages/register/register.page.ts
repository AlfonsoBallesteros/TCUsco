import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import {storage, initializeApp} from 'firebase';
import { FIREBASE_CONFIG } from './firebase.config';

declare var window;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  show_carrers: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  ConfrimpasswordType: string = 'password';
  ConfrimpasswordIcon: string = 'eye-off';
  equals_password: boolean = false;
  show_form_complete: boolean = false;
  genders: Array<string>;
  ocupations: Array<string>;
  carrers: Array<string>;
  year = null;
  currentTime = null;
  matching_passwords_group: FormGroup;
  registerForm: FormGroup;
  photo: string; 
  show_newfoto: boolean = false;
  new_photo: [];
  
  constructor(private actioCrtl: ActionSheetController, private formCrtl: FormBuilder, private alertCrtl: AlertController, private toastCrtl: ToastController, private router: Router, private usaurioServices: UsuarioService, private camara: Camera) { 
    // paste this code, should be include those are to constructor 
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.year = this.year - 18;
    initializeApp(FIREBASE_CONFIG);
  }

  ngOnInit() {
    this.photo = '/assets/img/perfil1.jpg';
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

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.registerForm = this.formCrtl.group({
        photo: new FormControl(''),
        name: new FormControl('', Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required])),
        lastName: new FormControl('', Validators.compose([
          Validators.maxLength(35),
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required])),
        cedula: new FormControl('', Validators.compose([
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('[0-9]{8,10}'),
          Validators.required])),
        date: new FormControl('', Validators.compose([
          Validators.required])),
        dir: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z #.0-9 -]*'),
          Validators.required])),
        tel: new FormControl('', Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(9),
          Validators.pattern('[0-9]{10}'),
          Validators.required])),
        gender: new FormControl('', Validators.required),
        ocupation: new FormControl('', Validators.required),
        carrer: new FormControl(''),
        codigo: new FormControl('', Validators.compose([
          Validators.maxLength(11),
          Validators.minLength(10),//^[1-2]+[0,9]+[0-2]+[0-9]{1,8}
          Validators.pattern('^[1-2]+[0,9]+[0-9]{1,9}'),
          Validators.required])),
        password: new FormControl('', Validators.compose([
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required])),
        confirm_password: new FormControl('', Validators.compose([
            Validators.required,
            this.equalto('password')])),
        terms: new FormControl(true, Validators.pattern('true')),
        rol: new FormControl('usuario'),
        estado: new FormControl('Activo'),
      });
  } 
  ocupacion(){
    let ocupacion = this.registerForm.get('ocupation').value;
    if(ocupacion == 'Estudiante'){
      this.show_carrers = true;
    }else{
      this.show_carrers = false;
    }
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
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
  confirmTooglePassword(){
    this.ConfrimpasswordType = this.ConfrimpasswordType === 'text' ? 'password' : 'text' ;
    this.ConfrimpasswordIcon = this.ConfrimpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  /*
  match_password(event: any){
    this.equals_password = true

    let password = this.registerForm.get('password').value;
    let confirm = event.target.value;
    if(password === confirm){
      this.equals_password = false;
      if(this.registerForm.valid == true){
        this.show_form_complete = true;
        console.log('Formulario... ' + this.registerForm.valid);
      }else{
        this.show_form_complete = false;
      }
    }else{
      this.equals_password = true;
      
    }
  }
*/
  async submit(values){
    
    if(this.show_newfoto){
      //this.registerForm.value['name'] = 'uri';
      console.log(this.registerForm.value);
      const crear = await this.usaurioServices.registro( this.registerForm.value);
      console.log(this.registerForm.value);
      this.toastSave();
      this.router.navigate(["/login"]);
    }else{
      console.log(this.registerForm.value);
      this.presentAlert();
      //this.router.navigate(["/login"]);
    }
  }

  async switchImage() {
    const actionSheet = await this.actioCrtl.create({
      mode: 'ios',
      buttons: [{
        text: 'Seleccionar foto',
        icon: 'images',
        handler: () => {
          this.takePhoto(this.camara.PictureSourceType.PHOTOLIBRARY),
          console.log('escoge image')
        }
      }, {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takePhoto(this.camara.PictureSourceType.CAMERA),
          console.log('toma Foto')
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCrtl.create({
      header: 'Invalido',
      subHeader: 'Imagen',
      message: 'Se necesita una imagen para registrarse.',
      buttons: ['OK'],
      mode:"ios"
    });

    await alert.present();
  }

  async toastSave() {
    const toast = await this.toastCrtl.create({
      message: 'Usuarios creado',
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }

  async takePhoto(sourceType){

    try{
    const options: CameraOptions = {
      quality: 60,
      targetHeight: 600,
      targetWidth:600,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    }

      const result = await this.camara.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      const id = Math.random().toString(36).substring(2);
      const pictures = storage().ref(`img_perfil/user_${id}`);
      pictures.putString(image, 'data_url').then( (result) => {
        pictures.getDownloadURL().then( url => { 
          this.new_photo = url;
          this.show_newfoto = true;
          this.registerForm.patchValue({
            photo: url
          });
          console.log(url)
        })
      })
      //pictures.getDownloadURL().then( url => { console.log(url)})//this.photo = url})

    }catch (e){
      console.error(e)
    }
  }
     
    
}

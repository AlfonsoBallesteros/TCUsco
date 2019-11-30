import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


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
  equals_password: boolean = true;
  genders: Array<string>;
  ocupations: Array<string>;
  carrers: Array<string>;
  year = null;
  currentTime = null;
  matching_passwords_group: FormGroup;
  registerForm: FormGroup;
  photo = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
  
  constructor(private actioCrtl: ActionSheetController, private formCrtl: FormBuilder, private alertCrtl: AlertController) { 
    // paste this code, should be include those are to constructor 
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.year = this.year - 18;
    console.log(this.year);
   
  }

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

    this.registerForm = this.formCrtl.group({
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
        carrer: new FormControl('', Validators.required),
        codigo: new FormControl('', Validators.compose([
          Validators.maxLength(11),
          Validators.minLength(10),
          Validators.pattern('^[1-2]+[0,9]+[0-2]+[0-9]{1,8}'),
          Validators.required])),
        password: new FormControl('', Validators.compose([
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required])),
        confirm_password: new FormControl('', Validators.compose([
            Validators.required])),
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

  tooglePassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  confirmTooglePassword(){
    this.ConfrimpasswordType = this.ConfrimpasswordType === 'text' ? 'password' : 'text' ;
    this.ConfrimpasswordIcon = this.ConfrimpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  match_password(){
    let password = this.registerForm.get('password').value;
    console.log(password);
    let confirm = this.registerForm.get('confirm_password').value;
    console.log(confirm);
    if(password === confirm){
      this.equals_password = false
      console.log(this.equals_password);
    }
  }

  submit(values){
    /*
    if(this.photo == 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'){
      this.presentAlert();
    }else{
      console.log(this.registerForm.value);
    }*/
    console.log(this.registerForm.value);
  }

  async switchImage() {
    const actionSheet = await this.actioCrtl.create({
      mode: 'ios',
      buttons: [{
        text: 'Seleccionar foto',
        icon: 'images',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          console.log('Share clicked');
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
}

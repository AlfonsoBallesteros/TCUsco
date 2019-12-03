import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password';
import { Router } from '@angular/router';

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
  photo = '/assets/img/perfil1.jpg';
  
  constructor(private actioCrtl: ActionSheetController, private formCrtl: FormBuilder, private alertCrtl: AlertController, private toastCrtl: ToastController, private router: Router) { 
    // paste this code, should be include those are to constructor 
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.year = this.year - 18;
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
        terms: new FormControl(true, Validators.pattern('true'))
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
  submit(values){
    /*
    if(this.photo == '/assets/img/perfil1.jpg'){
      this.presentAlert();
      //this.registerForm.value['name'] = 'uri';
    }else{
      console.log(this.registerForm.value);
    }*/
    console.log(this.registerForm.value);
    this.toastSave();
    this.router.navigate(["/login"]);
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

  async toastSave() {
    const toast = await this.toastCrtl.create({
      message: 'Usuarios creado',
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }
}
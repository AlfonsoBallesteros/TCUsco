import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  photo = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
  
  constructor(private actioCrtl: ActionSheetController, private formCrtl: FormBuilder, private alertCrtl: AlertController) { }

  ngOnInit() {
    this.registerForm = this.formCrtl.group({
        name: new FormControl('', Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required]))
      });
  } 

  submit(values){
    if(this.photo == 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'){
      this.presentAlert();
    }else{
      console.log(this.registerForm.value);
    }
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

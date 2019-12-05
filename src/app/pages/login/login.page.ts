import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Usuarios } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  valido: string;
  message: string;
  usuario: Usuarios = {};
  dataMenu: Object;

  constructor(private formCrtl: FormBuilder, private alertCrtl: AlertController, private router: Router, private toastCrtl: ToastController, private usuarioServices: UsuarioService) { }

  ngOnInit() {

    this.login_form = this.formCrtl.group({
      codigo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    
  }

  async submit(value){
    if(this.login_form.valid == true){
      let codigo = this.login_form.get('codigo').value;
      let password = this.login_form.get('password').value;
      const valido =  await this.usuarioServices.login( codigo, password);
      if(valido){
        this.message = 'Inicio de session exitosa';
        this.toastLogin();
        this.router.navigate(['/inicio']);
      }else{
        this.message= 'Contraseña/Usuario Incorrecto';
        this.alertLogin();
      }
      /*
        .subscribe( res =>{ 
         this.mensaje[0] = res;
         if(this.mensaje[0].ok){
          this.router.navigate(['/inicio']);
          this.message = 'Inicio de session exitosa';
          this.toastLogin();
          this.valido = JSON.stringify(this.mensaje[0].id);
         }else{
          this.message = JSON.stringify(this.mensaje[0].message);
          this.alertLogin();
         }
        });*/
      
      /*
      if(codigo == this.codigo){
        if( password == this.password){
          this.router.navigate(['/inicio']);
          this.message = 'Inicio de session exitosa';
          this.toastLogin();
        }else{
          this.message= 'Contraseña Incorrecta';
        this.alertLogin();
        }
      }else{
        this.message= 'Este codigo no aparece registrado';
        this.alertLogin();
      }
      */
    }else{
      this.message = 'Todos los campos son requeridos'
      this.alertLogin();
    }
  }

  tooglePassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async alertLogin() {
    const alert = await this.alertCrtl.create({
      header: 'Invalido',
      message: this.message,
      mode:'ios',
      buttons: ['OK']
    });

    await alert.present();
  }
  async toastLogin() {
    const toast = await this.toastCrtl.create({
      message: this.message,
      duration: 2000,
      mode:"md"
    });
    toast.present();
  }
}

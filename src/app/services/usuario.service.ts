import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { login, Usuarios } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuarios = {};

  constructor( private http: HttpClient, private storage: Storage, private NavCrtl: NavController) { }

  login( codigo: string, password: string){
    const data = { codigo, password }

    return new Promise ( ( resolve)=>{ 
    return this.http.post<login>(`${URL}/api/users/login`, data)
    .subscribe( res => {
      if( res['ok']){
        this.guardaToken( res['token']);
        resolve(true);
      }else{
        this.token = null;
        this.storage.clear();
        resolve(false);
      }
    });

  });
 
  }

  registro( usuario: Usuarios){

    return new Promise(resolve =>{
      this.http.post(`${ URL }/api/users`, usuario)
        .subscribe( res =>{
          console.log(res);
          if( res['ok']){
            resolve(true);
          }else{
            resolve(false);
          }
        })
    });
  }

  async guardaToken(token: string){
    this.token = token;
    await this.storage.set('token', token)
    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if( !this.token ){
      this.NavCrtl.navigateRoot('/login')
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve =>{
      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get(`${ URL }/api/users/getUser`, { headers })
        .subscribe( res => {
          if( res['ok']){
            this.usuario = res['usuario'];
            resolve(true);
          }else{
            this.NavCrtl.navigateRoot('/login')
            resolve(false);
          }
        });
    })
  }

  getUsuario(){
    if( !this.usuario._id ){
      this.validaToken();
    }
    return { ...this.usuario}
  }

  actualizarUsuario( usuario: Usuarios ){

    return new Promise<boolean>(resolve =>{
      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.put(`${ URL }/api/users/update`, usuario, {headers})
        .subscribe( res => {
          if( res['ok']){
            this.guardaToken( res['token'] );
            resolve(true);
          }else{
            resolve(false);
          }
        });
    })
  }

  logout() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.NavCrtl.navigateRoot('/login', { animated: true });
  }

  getAllUsers(){

    return this.http.get<Usuarios>(`${ URL }/api/users`);
    
  }
}

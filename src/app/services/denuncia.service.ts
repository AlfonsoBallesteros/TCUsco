import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listDenuncias, Denuncia } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor( private http: HttpClient) { }

  getDenuncias(id){
    return  this.http.get<listDenuncias>(`${ URL }/api/denuncia/${id}`);
  }

  postDenuncias(post: Denuncia){
    return new Promise( resolve => {
      this.http.post(`${ URL }/api/denuncia`, post)
        .subscribe( res => {
          if( res['ok']){
            resolve(true);
          }else{
            resolve(false);
          }
        });
    });
  }
}

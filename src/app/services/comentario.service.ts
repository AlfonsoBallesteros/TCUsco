import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentarios, Comentario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  nuevoComennt = new EventEmitter<Comentarios>();

  getComment( id_post ){
    return this.http.get<Comentarios>(`${ URL }/api/coment/${id_post}`);
  }

  postComment( comentario: Comentario){
    return new Promise( resolve => {
      this.http.post(`${ URL }/api/coment`, comentario)
        .subscribe( res => {
          console.log(res);
          if( res['ok']){
            this.nuevoComennt.emit(res['comment']);
            resolve(true);
          }else{
            resolve(false);
          }
        });
    });
  } 

  getCount( id_post){
    return this.http.get(`${ URL }/api/coment/count/${id_post}`);
  }

}

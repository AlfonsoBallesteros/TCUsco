import { Injectable,  EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post} from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }

  nuevoPost = new EventEmitter<RespuestaPosts>();

  getPost(){
    return this.http.get<RespuestaPosts>(`${ URL }/api/posts/`);
  }

  crearPost( post: Post){

    return new Promise( resolve => {
      this.http.post(`${ URL }/api/posts`, post)
        .subscribe( res => {
          this.nuevoPost.emit( res['post'] );
          resolve(true);
        });
    });
    }
}

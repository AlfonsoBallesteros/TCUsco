import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { menu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private Dataservice = new BehaviorSubject<menu>({photo: 'uri', nombre: 'default'});
  currentData = this.Dataservice.asObservable();
  constructor() { }

  changeData(data: menu){
    this.Dataservice.next(data);
  }
}

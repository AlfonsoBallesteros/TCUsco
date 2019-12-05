import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private Dataservice = new BehaviorSubject<Object>({photo: 'uri', nombre: 'default'});
  currentData = this.Dataservice.asObservable();
  constructor() { }

  changeData(data: object){
    this.Dataservice.next(data);
  }
}

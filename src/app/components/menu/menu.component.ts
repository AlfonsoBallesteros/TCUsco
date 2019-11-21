import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  nombre: string = "Alfonso";
  //https://i.redd.it/it7bpow6g9901.jpg
  perfil: string = "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fperfil2.jpeg?alt=media&token=526bc9ec-5416-4002-8a99-19af909615c4";

  componentes: Observable<Componente[]>;

  constructor(private dataService: DataService, private modalCtrl: ModalController) { }

  async openImage(){
      let modal = await this.modalCtrl.create({
        component: PreviewModalComponent, 
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps:{
          img: this.perfil
        }
      });
    return await modal.present();
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

}

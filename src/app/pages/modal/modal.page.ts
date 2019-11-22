import { Component, OnInit} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  pagina: string;
  show: boolean = true;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    console.log(this.navParams);
    this.pagina = this.navParams.data.pagina;
  }

  close(){
    this.modalCtrl.dismiss();
  }

}

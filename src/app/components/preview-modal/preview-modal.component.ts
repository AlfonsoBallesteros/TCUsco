import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss'],
})  
export class PreviewModalComponent implements OnInit {

  @Input() img;

  constructor(private modalCtrl: ModalController) { }

  close(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}

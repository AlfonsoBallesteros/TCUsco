import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { ModalPage } from '../modal/modal.page';
import { ModalPageModule } from '../modal/modal.module';

@NgModule({
  entryComponents:[
    PopinfoComponent,
    ModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ComponentsModule,
    ModalPageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}

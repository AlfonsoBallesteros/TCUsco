import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
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
    UsuariosPageRoutingModule,
    ComponentsModule,
    ModalPageModule
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}

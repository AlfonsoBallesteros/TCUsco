import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { PerfilUserPageRoutingModule } from './perfil-user-routing.module';

import { PerfilUserPage } from './perfil-user.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PreviewModalComponent } from 'src/app/components/preview-modal/preview-modal.component';
import { ModalPageModule } from '../modal/modal.module';
import { ModalPage } from '../modal/modal.page';

@NgModule({
  entryComponents:[
    PreviewModalComponent,
    ModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageModule,
    ComponentsModule,
    PerfilUserPageRoutingModule
  ],
  declarations: [PerfilUserPage]
})
export class PerfilUserPageModule {}

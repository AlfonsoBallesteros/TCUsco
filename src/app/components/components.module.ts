import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { PopinfoComponent } from './popinfo/popinfo.component';


@NgModule({
  entryComponents:[
    PreviewModalComponent
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    PreviewModalComponent,
    PopinfoComponent
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    PreviewModalComponent,
    PopinfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ComponentsModule { }

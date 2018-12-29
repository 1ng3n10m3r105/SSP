import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoAtencionPage } from './tipo-atencion';

@NgModule({
  declarations: [
    TipoAtencionPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoAtencionPage),
  ],
})
export class TipoAtencionPageModule {}

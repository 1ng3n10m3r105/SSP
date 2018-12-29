import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspeciePage } from './especie';

@NgModule({
  declarations: [
    EspeciePage,
  ],
  imports: [
    IonicPageModule.forChild(EspeciePage),
  ],
})
export class EspeciePageModule {}

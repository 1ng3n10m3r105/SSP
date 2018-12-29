import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegationsPage } from './delegations';

@NgModule({
  declarations: [
    DelegationsPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegationsPage),
  ],
})
export class DelegationsPageModule {}

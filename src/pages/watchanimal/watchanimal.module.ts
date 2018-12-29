import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchanimalPage } from './watchanimal';

@NgModule({
  declarations: [
    WatchanimalPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchanimalPage),
  ],
})
export class WatchanimalPageModule {}

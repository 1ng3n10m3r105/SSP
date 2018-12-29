import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  constructor(private viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}

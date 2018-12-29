import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

import { LoginPage } from '../login/login';
import { DetalleBvaPage } from '../detalle-bva/detalle-bva';
import { CreateBvaPage } from '../create-bva/create-bva';


@Component({
  selector: 'page-view-bva',
  templateUrl: 'view-bva.html'
})

export class ViewBvaPage {

  items: Array<any>;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {
  
    }

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.firebaseService.getReporteBVA()
    .then(tasks => {
      this.items = tasks;
    })
  }

  viewDetails(id, item){
    // debugger
    let data = {
      fecha:item.fecha,
      folioucs:item.folioucs,
      folioInt:item.folioInt,
      fechaRec:item.fechaRec,
      horaAten:item.horaAten,
      horaRec:item.horaRec,
      nombre:item.nombre,
      direccion:item.direccion,
      colonia:item.colonia,
      telefono:item.telefono,
      delegacion:item.delegacion,
      region:item.region,
      sector:item.sector,
      cuadrante:item.cuadrante,
      tipo_aten:item.tipo_aten,
      especie:item.especie,
      patrullas:item.patrullas,
      elementos:item.elementos,
      observaciones:item.observaciones,
      longitud:item.longitud,
      latitud:item.latitud,
         image: item.image,
         id: id
    }
    this.navCtrl.push(DetalleBvaPage, {
      data: data
    })
  }

  openNewUserModal(){
    this.navCtrl.push(CreateBvaPage);
   
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
  }
  getItems(items:any){
     
    this.initializeItems();
    const val = items.target.value;
    if(val && val.trim() != ''){
      
     this.items = this.items.filter((notes)=>{
        return (items.fecha.toLowerCase().indexOf(val.toLowerCase())>-1);
      });
      
    }
  
    else{
      this.firebaseService.getReporteBVA()
      .then(tasks => {
        this.items = tasks;
      })
   
   
  }
  }
  initializeItems(): void{
    this.items=this.items;
   }
  

}

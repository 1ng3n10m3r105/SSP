import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, ToastController} from 'ionic-angular';

import * as moment from 'moment';
import { NotesService } from '../../services/note.service';
import { DelegationsPage } from '../delegations/delegations';
import { HomePage } from '../home/home';

import { PopoverController } from 'ionic-angular';
import { TipoAtencionPage } from '../tipo-atencion/tipo-atencion';
import { EspeciePage } from '../especie/especie';

import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  imagenPreview:string="";
  imagen64:string[];
  delegation={id:null,nombre:null};
  delegations=[];
  type_aten={id:null,nombre:null};
  types_aten=[];
  especye={id:null,nombre:null};
  especyes=[];
  user={id:null,displayName:null,matricula:null,puesto:null};
  users=[];
username: string;
firedata = firebase.database().ref('/users');
  
  
 
 
  note={id:null,fecha:null,folioucs:null,folioInt:null,
        horaRec:null,horaAten:null,fechaRec:null,
        nombre:null,direccion:null,colonia:null,
        telefono:null,delegacion:null,region:null,
        sector:null,cuadrante:null,tipo_aten:null,especie:null,userinfo:null,
        patrullas:null,elementos:null,observaciones:null}
  id=null;
  show=true;
  profileData : Observable<UserProvider>
  constructor(private camera: Camera, private toast: ToastController,private afAuth:AngularFireAuth,private afDatabase: AngularFireDatabase,public popoverCtrl: PopoverController,public navCtrl: NavController,public navParams: NavParams, public notesService:NotesService, private modalCtrl:ModalController,public actionCtrl:ActionSheetController) {
    
    this.note.fecha = moment().lang('es').format('LL');
    this.note.horaRec = moment().format('LTS');
    this.note.fechaRec =  moment().lang('es').format('LL');


    
 
  

    this.id =navParams.get('id');
    if(this.id != 0){
         notesService.getNote(this.id)
         .valueChanges()
         .subscribe(note => {
          this.note = <any>note;
         });

        
    }
   

    this.navCtrl = navCtrl;
    this.username = window.localStorage.getItem('username');
   notesService.getDelegations()
    .valueChanges()
      .subscribe( delegaciones => {
       this.delegations = delegaciones;
   });

   
   
   this.afAuth.authState.subscribe(data =>{
    if(data && data.email && data.uid){
    
      this.profileData = <any>this.afDatabase.object(`users/${data.uid}`).valueChanges()
      
    }
  })





    this.navCtrl = navCtrl;
    this.username = window.localStorage.getItem('username');
   notesService.getTypes_aten()
    .valueChanges()
      .subscribe( tipos_aten => {
       this.types_aten = tipos_aten;
   });
   

    this.navCtrl = navCtrl;
    this.username = window.localStorage.getItem('username');
   notesService.getEspecies()
    .valueChanges()
      .subscribe( especies => {
       this.especyes = especies;
   });
   
  
  }

  
  addNote(){
    if(this.id != 0){
        this.notesService.editNote(this.note);
        alert('Nota editada con exito');
      
    }else{
      this.note.id = Date.now();
      this.notesService.createNote(this.note);
      alert('Nota creada con exito');
      

    }
    this.navCtrl.pop();
  }
  deleteNote(){
    this.show =false;
    this.notesService.deleteNote(this.note);
    alert('Nota eliminada con exito');
    this.navCtrl.pop();
  }

  compareFn(a:{id:number,name:string} , b:{id:number,name:string}){
  if(a.id === b.id){
    return true;
  }
  return false;
 }
addDelegation(){
  if(this.id != 0){
      this.notesService.editDelegation(this.delegation);
      alert('Nota editada con exito');
    
  }else{
    this.delegation.id = Date.now();
    this.notesService.createDelegation(this.delegation);
    alert('Nota creada con exito');
    

  }
  this.navCtrl.pop();
}
deleteDelegation(){
  this.show =false;
  this.notesService.deleteDelegation(this.delegation);
  alert('Nota eliminada con exito');
  this.navCtrl.pop();
}
public goToDetailDelegation(id){
  this.navCtrl.push(DelegationsPage, {id:id});
}
public createDelegation(){
 this.navCtrl.push(DelegationsPage, {id:0});
 }
 mostrar_modal(){
  let modal = this.modalCtrl.create(HomePage);
  modal.present();
}


addType_aten(){
  if(this.id != 0){
      this.notesService.editType_aten(this.type_aten);
      alert('Nota editada con exito');
    
  }else{
    this.type_aten.id = Date.now();
    this.notesService.createType_aten(this.type_aten);
    alert('Nota creada con exito');
    

  }
  this.navCtrl.pop();
}
deleteType_aten(){
  this.show =false;
  this.notesService.deleteType_aten(this.type_aten);
  alert('Nota eliminada con exito');
  this.navCtrl.pop();
}
public goToDetailType_aten(id){
  this.navCtrl.push(TipoAtencionPage, {id:id});
}
public createType_aten(){
 this.navCtrl.push(TipoAtencionPage, {id:0});
 }
 mostrar_modal1(){
  let modal = this.modalCtrl.create(TipoAtencionPage);
  modal.present();
}


addEspecie(){
  if(this.id != 0){
      this.notesService.editDelegation(this.delegation);
      alert('Nota editada con exito');
    
  }else{
    this.type_aten.id = Date.now();
    this.notesService.createType_aten(this.type_aten);
    alert('Nota creada con exito');
    

  }
  this.navCtrl.pop();
}
deleteEspecie(){
  this.show =false;
  this.notesService.deleteType_aten(this.type_aten);
  alert('Nota eliminada con exito');
  this.navCtrl.pop();
}
public goToDetailEspecie(id){
  this.navCtrl.push(TipoAtencionPage, {id:id});
}
public createEspecie(){
 this.navCtrl.push(TipoAtencionPage, {id:0});
 }
 mostrar_modal2(){
  let modal = this.modalCtrl.create(EspeciePage);
  modal.present();
}
ionViewWillLoad(){

}

/*
openMenu() {
  let actionSheet = this.actionCtrl.create({
    title: 'Albums',
    cssClass: 'action-sheets-basic-page',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon:  'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      },
      {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      },
      {
        text: 'Play',
        icon:  'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      },
      {
        text: 'Favorite',
        icon:  'heart-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}*/
selecionar_foto() {
  const options: CameraOptions = {
  quality: 50,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG, 
  mediaType: this.camera.MediaType.PICTURE, 
  sourceType: 2 //DESDE Libreria
  };
  this.camera.getPicture(options).then((imageData) => {
  this.imagenPreview = `data:image/jpeg;base64,` + imageData;
  this.imagen64= imageData;
  
  }, (err) => {
  console.log("Error en galería: ", JSON.stringify(err));
  });
  }
}






 
  




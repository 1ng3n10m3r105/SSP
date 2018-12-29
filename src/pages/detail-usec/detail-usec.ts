import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { NotesService } from '../../services/note.service';


import { PopoverController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the DetailUsecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-usec',
  templateUrl: 'detail-usec.html',
})
export class DetailUsecPage {

  delegation={id:null,nombre:null};
  delegations=[];
  notes = [];
  user={id:null,displayName:null,matricula:null,puesto:null};
  users=[];
username: string;
firedata = firebase.database().ref('/users');
  
  
 
 
  note={id:null,fecha:null,actividad:null,lugar:null,
        ubicacion:null,colonia:null,delegacion:null,
        sector:null,georeferencia:null,beneficiados:null,
        tripticos:null,platicas:null,latitud:null,
        tripulacion:null,unidad:null,horaRec:null,fechaRec:null,longitud:null,usuario:{id:null,displayName:null,matricula:null,puesto:null}};
  id=null;
  show=true;
  profileData : Observable<UserProvider>
 
  constructor(public afireauth: AngularFireAuth,
              public geolocation: Geolocation,
              private toast: ToastController,
              private afAuth:AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              public popoverCtrl: PopoverController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public notesService:NotesService,
              private modalCtrl:ModalController,
              public actionCtrl:ActionSheetController,
              public afDB: AngularFireDatabase
              ) {
               

              
                
                this.afAuth.authState.subscribe(data =>{
                  if(data && data.email && data.uid){
                    this.user.displayName= <any>data.displayName;
                    this.user.matricula=<any>data.email;
                    this.user.id=<any>data.uid;
                    
                  }
                  this.note.usuario=<any>this.user; 
 
                
                });
                
    this.geolocation.getCurrentPosition().then((geposition:Geoposition)=>{
     this.note.latitud = geposition.coords.latitude;
     this.note.longitud = geposition.coords.longitude;

    })
    this.note.fecha = moment().lang('es').format('LL');
    this.note.horaRec = moment().format('LTS');
    this.note.fechaRec =  moment().lang('es').format('LL');
    
    
  
    this.id =navParams.get('id');
    if(this.id != 0){
         notesService.getNoteUsec(this.id)
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





  
  }

  
  addNoteUsec(){
    if(this.id != 0){
        this.notesService.editNoteUsec(this.note);
        alert('Nota editada con exito');
      
    }else{
      this.note.id = Date.now();
      this.notesService.createNoteUsec(this.note);
      alert('Nota creada con exito');
      

    }
    this.navCtrl.pop();
  }
  deleteNoteUsec(){
    this.show =false;
    this.notesService.deleteNoteUsec(this.note);
    alert('Nota eliminada con exito');
    this.navCtrl.pop();
  }

  compareFn(a:{id:number,name:string} , b:{id:number,name:string}){
  if(a.id === b.id){
    return true;
  }
  return false;
 }

 getItems(notes:any){
     
  this.initializeItems();
  const val = notes.target.value;
  if(val && val.trim() != ''){
    
   this.notes = this.notes.filter((notes)=>{
      return (notes.fecha.toLowerCase().indexOf(val.toLowerCase())>-1);
    });
    
  }

  else{
 this.notesService.getNotesUsec().valueChanges()
 .subscribe( notas => {
  this.notes = notas;
   });
 
 
}
}
initializeItems(): void{
  this.notes=this.notes;
 }

 

}

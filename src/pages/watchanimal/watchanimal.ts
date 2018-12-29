import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { NotesService } from '../../services/note.service';
import { DetailPage } from '../detail/detail';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the WatchanimalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-watchanimal',
  templateUrl: 'watchanimal.html',
})
export class WatchanimalPage {
  


  notes = [];
  delegations=[];
  username: string;
  items: any[];
  constructor(private db: AngularFireDatabase,public notesService : NotesService,public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  this.username = window.localStorage.getItem('username');
 notesService.getNotes()
  .valueChanges()
    .subscribe( notas => {
     this.notes = notas;
 });
 notesService.getDelegations()
    .valueChanges()
      .subscribe( delegaciones => {
       this.delegations = delegaciones;
   });

  }
  


  public goToDetail(id){
    this.nav.push(DetailPage, {id:id});
  }
  public createNote(){
   this.nav.push(DetailPage, {id:0});
   }

 
   signOut(){
     this.nav.setRoot('LoginPage');
     window.location.reload();
   }

   getItems(notes){
     
     this.initializeItems();
     const val = notes.target.value;
     if(val && val.trim() != ''){
       
      this.notes = this.notes.filter((notes)=>{
         return (notes.fecha.toLowerCase().indexOf(val.toLowerCase())>-1);
       });
       
     }
  
     else{
    this.notesService.getNotes().valueChanges()
    .subscribe( notas => {
     this.notes = notas;
      });
    
    
   }
  }
  getItems1(notes: any){
     
    this.initializeItems();
    const val = notes.target.value;
    if(val && val.trim() != ''){
      this.notes = this.notes.filter((notes)=>{
        return (notes.especie.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
        
      });
    }
 
    else{
         this.initializeItems();
   this.notesService.getNotes().valueChanges()
   .subscribe( notas => {
    this.notes = notas;
     });
   
   
  }
 }
 getItems2(notes: any){
     
  this.initializeItems();
  const val = notes.target.value;
  if(val && val.trim() != ''){
    this.notes = this.notes.filter((notes)=>{
      return (notes.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
      
    });
  }

  else{
       this.initializeItems();
 this.notesService.getNotes().valueChanges()
 .subscribe( notas => {
  this.notes = notas;
   });
 
 
}
}
getItems3(notes: any){
     
  this.initializeItems();
  const val = notes.target.value;
  if(val && val.trim() != ''){
    this.notes = this.notes.filter((notes)=>{
      return (notes.delegacion.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
      
    });
  }

  else{
       this.initializeItems();
 this.notesService.getNotes().valueChanges()
 .subscribe( notas => {
  this.notes = notas;
   });
 
 
}
}
  initializeItems(): void{
   this.notes=this.notes;
  }
  
  


}

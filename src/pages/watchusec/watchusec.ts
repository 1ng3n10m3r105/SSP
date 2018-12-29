import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';

import { DetailUsecPage } from '../detail-usec/detail-usec';
/**
 * Generated class for the WatchusecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-watchusec',
  templateUrl: 'watchusec.html',
})
export class WatchusecPage {

  notes = [];
  notesuser = [];

  username: string;
  constructor(public notesService : NotesService,public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  this.username = window.localStorage.getItem('username');
 notesService.getNotesUsec()
  .valueChanges()
    .subscribe( notas => {
     this.notes = notas;
 });
 notesService.getNotesUser()
  .valueChanges()
    .subscribe( notas => {
     this.notesuser = notas;
 });
  }
  public goToDetailUsec(id){
    this.nav.push(DetailUsecPage, {id:id});
  }
  public createNoteUsec(){
   this.nav.push(DetailUsecPage, {id:0});
   }

 
   signOut(){
     this.nav.setRoot('LoginPage');
     window.location.reload();
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
import { DetailVigilanciaPage } from '../detail-vigilancia/detail-vigilancia';
/**

/**
 * Generated class for the WatchvigilanciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-watchvigilancia',
  templateUrl: 'watchvigilancia.html',
})
export class WatchvigilanciaPage {

  notes = [];
  notesuser = [];

  username: string;
  constructor(public notesService : NotesService,public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  this.username = window.localStorage.getItem('username');
 notesService.getNotesVigilancia()
  .valueChanges()
    .subscribe( notas => {
     this.notes = notas;
 });
 notesService.getNotesVigilancia()
  .valueChanges()
    .subscribe( notas => {
     this.notesuser = notas;
 });
  }
  public goToDetailVigilancia(id){
    this.nav.push(DetailVigilanciaPage, {id:id});
  }
  public createNoteVigilancia(){
   this.nav.push(DetailVigilanciaPage, {id:0});
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
   this.notesService.getNotesVigilancia().valueChanges()
   .subscribe( notas => {
    this.notes = notas;
     });
   
   
  }
  }
  initializeItems(): void{
    this.notes=this.notes;
   }
  
  

}

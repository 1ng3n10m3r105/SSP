import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
import { DetailAlcoholimetroPage } from '../detail-alcoholimetro/detail-alcoholimetro';

/**
 * Generated class for the WatchalcoholimetroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-watchalcoholimetro',
  templateUrl: 'watchalcoholimetro.html',
})
export class WatchalcoholimetroPage {

  notes = [];
  notesuser = [];

  username: string;
  constructor(public notesService : NotesService,public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  this.username = window.localStorage.getItem('username');
 notesService.getNotesAlcoholimetro()
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
  public goToDetailAlcoholimetro(id){
    this.nav.push(DetailAlcoholimetroPage, {id:id});
  }
  public createNoteAlcoholimetro(){
    this.nav.push(DetailAlcoholimetroPage, {id:0});
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
   this.notesService.getNotesAlcoholimetro().valueChanges()
   .subscribe( notas => {
    this.notes = notas;
     });
   
   
  }
  }
  initializeItems(): void{
    this.notes=this.notes;
   }
  
  

  

}

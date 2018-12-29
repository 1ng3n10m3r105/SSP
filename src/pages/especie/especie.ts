import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
/**
 * Generated class for the EspeciePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-especie',
  templateUrl: 'especie.html',
})
export class EspeciePage {
   especye={id:null,nombre:null};
    especyes=[];
    id=null;
    show=true;
    username: string;
    constructor(public nav: NavController,public navParams: NavParams, public notesService:NotesService) {
      this.nav = nav;
      this.username = window.localStorage.getItem('username');
     notesService.getEspecies()
      .valueChanges()
        .subscribe( especies => {
         this.especyes = especies;
     });
      this.id =navParams.get('id');
      if(this.id != 0){
           notesService.getEspecie(this.id)
           .valueChanges()
           .subscribe(especie => {
            this.especye = <any>especie;
           });
      }
      
     
    }
    addEspecie(){
      if(this.id != 0){
          this.notesService.editEspecie(this.especye);
          alert('Nota editada con exito');
        
      }else{
        this.especye.id = Date.now();
        this.notesService.createEspecie(this.especye);
        alert('Nota creada con exito');
        
  
      }
      this.nav.pop();
    }
   
    deleteEspecie(){
      this.show =false;
      this.notesService.deleteEspecie(this.especye);
      alert('Nota eliminada con exito');
      this.nav.pop();
    }
    public goToDetailEspecie(id){
      this.nav.push(EspeciePage, {id:id});
    }
    public createEspecie(){
     this.nav.push(EspeciePage, {id:0});
     }
  
  

}

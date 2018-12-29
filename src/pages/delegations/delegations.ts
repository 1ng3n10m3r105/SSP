import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';

/**
 * Generated class for the DelegationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delegations',
  templateUrl: 'delegations.html',
})
export class DelegationsPage {
  delegation={id:null,nombre:null};
  delegations=[];
  id=null;
  show=true;
  username: string;
  items:any[];
  constructor(public nav: NavController,public navParams: NavParams, public notesService:NotesService) {
    this.nav = nav;
    this.username = window.localStorage.getItem('username');
   notesService.getDelegations()
    .valueChanges()
      .subscribe( delegaciones => {
       this.delegations = delegaciones;
   });
    this.id =navParams.get('id');
    if(this.id != 0){
         notesService.getDelegation(this.id)
         .valueChanges()
         .subscribe(delegacion => {
          this.delegation = <any>delegacion;
         });
    }
    
   
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
    this.nav.pop();
  }
  deleteDelegation(){
    this.show =false;
    this.notesService.deleteDelegation(this.delegation);
    alert('Nota eliminada con exito');
    this.nav.pop();
  }
  public goToDetailDelegation(id){
    this.nav.push(DelegationsPage, {id:id});
  }
  public createDelegation(){
   this.nav.push(DelegationsPage, {id:0});
   }

   getItems(delegations: any){
     
    this.initializeItems();
    const val = delegations.target.value;
    if(val && val.trim() != ''){
      this.delegations = this.delegations.filter((delegations)=>{
        return (delegations.delegation.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
        
      });
    }
  
    else{
         this.initializeItems();
   this.notesService.getDelegations().valueChanges()
   .subscribe( delegaciones => {
    this.delegations = delegaciones;
     });
   
   
  }
  }
    initializeItems(): void{
     this.delegations=this.delegations;
    }
    
    
}

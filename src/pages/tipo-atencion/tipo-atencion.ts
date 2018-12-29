import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';

/**
 * Generated class for the TipoAtencionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipo-atencion',
  templateUrl: 'tipo-atencion.html',
})
export class TipoAtencionPage {

  type_aten={id:null,nombre:null};
  types_aten=[];
  id=null;
  show=true;
  username: string;
  constructor(public nav: NavController,public navParams: NavParams, public notesService:NotesService) {
    this.nav = nav;
    this.username = window.localStorage.getItem('username');
   notesService.getTypes_aten()
    .valueChanges()
      .subscribe( tipos_aten => {
       this.types_aten = tipos_aten;
   });
    this.id =navParams.get('id');
    if(this.id != 0){
         notesService.getType_aten(this.id)
         .valueChanges()
         .subscribe(tipo_aten => {
          this.type_aten = <any>tipo_aten;
         });
    }
    
   
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
    this.nav.pop();
  }
  deleteType_aten(){
    this.show =false;
    this.notesService.deleteType_aten(this.type_aten);
    alert('Nota eliminada con exito');
    this.nav.pop();
  }
  public goToDetailType_aten(id){
    this.nav.push(TipoAtencionPage, {id:id});
  }
  public createType_aten(){
   this.nav.push(TipoAtencionPage, {id:0});
   }


}

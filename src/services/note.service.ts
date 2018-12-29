import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/database';




@Injectable()
export class NotesService{
    constructor(public afDB: AngularFireDatabase){
     }
 notes =[];
 delegations=[];
 types_aten=[];
 especies=[];
 notesAnimalEsc=[];
 notesUsec=[];
 public getNotes(){
    // return this.notes;
    return this.afDB.list('notasAnimal/');
    
  } 
  public getNotesVigilancia(){
    // return this.notes;
    return this.afDB.list('notasVigilancia/');
    
  } 
  public getNotesAlcoholimetro(){
    // return this.notes;
    return this.afDB.list('notasAlcoholimetro/');
    
  } 
  public getNotesUsec(){
    // return this.notes;
    return this.afDB.list('notasUsec/');
    
  } 
  public getNotesEsc(){
    // return this.notes;
    return this.afDB.list('notasAnimalEsc/');
    
  }
  public getNotesUser(){
    // return this.notes;
    return this.afDB.list('users/');
    
  }
 public getNote(id){
     //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
     return this.afDB.object('notasAnimal/'+id);
  }
  public getNoteVigilancia(id){
    //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
    return this.afDB.object('notasVigilancia/'+id);
 }

  public getNoteAlcoholimetro(id){
    //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
    return this.afDB.object('notasAlcoholimetro/'+id);
 }
  public getNoteUser(id){
    //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
    return this.afDB.object('users/'+id);
 }
  public getNoteUsec(id){
    //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
    return this.afDB.object('notasUsec/'+id);
 }
  public getNoteEsc(id){
    //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
    return this.afDB.object('notasAnimalEsc/'+id);
 }

  public createNote(note){
    this.afDB.database.ref('notasAnimal/'+note.id).set(note);
 
    //this.notes.push(note);
  }
  public createNoteVigilancia(note){
    this.afDB.database.ref('notasVigilancia/'+note.id).set(note);
 
    //this.notes.push(note);
  }
  public createNoteAlcoholimetro(note){
    this.afDB.database.ref('notasAlcoholimetro/'+note.id).set(note);
 
    //this.notes.push(note);
  }
  public createNoteUsec(note){
    this.afDB.database.ref('notasUsec/'+note.id).set(note);
    //this.notes.push(note);
  }
  public createNoteEsc(note){
    this.afDB.database.ref('notasAnimalEsc/'+note.id).set(note);
    //this.notes.push(note);
  }
 
 public editNote(note){
 /*   for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes[i] = note;
        }
     }*/
     this.afDB.database.ref('notasAnimal/'+note.id).set(note);
  }
  public editNoteVigilancia(note){
    /*   for(let i=0; i< this.notes.length; i++){
           if(this.notes[i].id == note.id){
               this.notes[i] = note;
           }
        }*/
        this.afDB.database.ref('notasVigilancia/'+note.id).set(note);
     }
  public editNoteAlcoholimetro(note){
    /*   for(let i=0; i< this.notes.length; i++){
           if(this.notes[i].id == note.id){
               this.notes[i] = note;
           }
        }*/
        this.afDB.database.ref('notasAlcoholimetro/'+note.id).set(note);
     }
  public editNoteUsec(note){
    /*   for(let i=0; i< this.notes.length; i++){
           if(this.notes[i].id == note.id){
               this.notes[i] = note;
           }
        }*/
        this.afDB.database.ref('notasUsec/'+note.id).set(note);
     }
  public editNoteEsc(note){
    /*   for(let i=0; i< this.notes.length; i++){
           if(this.notes[i].id == note.id){
               this.notes[i] = note;
           }
        }*/
        this.afDB.database.ref('notasAnimalEsc/'+note.id).set(note);
     }
   
  public deleteNote(note){
    this.afDB.database.ref('notasAnimal/'+note.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
     
  public deleteNoteVigilancia(note){
    this.afDB.database.ref('notasVigilancia/'+note.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  public deleteNoteAlcoholimetro(note){
    this.afDB.database.ref('notasAlcoholimetro/'+note.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  public deleteNoteUsec(note){
    this.afDB.database.ref('notasUsec/'+note.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  public deleteNoteEsc(note){
    this.afDB.database.ref('notasAnimalEsc/'+note.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  
  
  
  public getDelegations(){
    // return this.notes;
    return this.afDB.list('delegations/');
    
  }  
 
 public getDelegation(id){
     //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
     return this.afDB.object('delegations/'+id);
  }

  public createDelegation(delegation){
    this.afDB.database.ref('delegations/'+delegation.id).set(delegation);
    //this.notes.push(note);
  }
 
 public editDelegation(delegation){
 /*   for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes[i] = note;
        }
     }*/
     this.afDB.database.ref('delegations/'+delegation.id).set(delegation);
  }

  public deleteDelegation(delegation){
    this.afDB.database.ref('delegations/'+delegation.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
 
 
  public getTypes_aten(){
    // return this.notes;
    return this.afDB.list('type-aten/');
    
  }  
 
 public getType_aten(id){
     //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
     return this.afDB.object('type-aten/'+id);
  }

  public createType_aten(type_aten){
    this.afDB.database.ref('type-aten/'+type_aten.id).set(type_aten);
    //this.notes.push(note);
  }
 
 public editType_aten(type_aten){
 /*   for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes[i] = note;
        }
     }*/
     this.afDB.database.ref('type-aten/'+type_aten.id).set(type_aten);
  }

  public deleteType_aten(type_aten){
    this.afDB.database.ref('type-aten/'+type_aten.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  
  
  
  public getEspecies(){
    // return this.notes;
    return this.afDB.list('especie/');
    
  }  
 
 public getEspecie(id){
     //return this.notes.filter(function(e, i){return e.id== id}) [0] || {id:null, title:null, description:null};
     return this.afDB.object('especie/'+id);
  }

  public createEspecie(especie){
    this.afDB.database.ref('especie/'+especie.id).set(especie);
    //this.notes.push(note);
  }
 
 public editEspecie(especie){
 /*   for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes[i] = note;
        }
     }*/
     this.afDB.database.ref('especie/'+especie.id).set(especie);
  }

  public deleteEspecie(especie){
    this.afDB.database.ref('especie/'+especie.id).remove();
   /* for(let i=0; i< this.notes.length; i++){
        if(this.notes[i].id == note.id){
            this.notes.splice(i,1);
        }
     }*/
  }
  
}
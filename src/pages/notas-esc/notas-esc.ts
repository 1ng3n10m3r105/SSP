import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { NotesService } from '../../services/note.service';
import { DetailNoteEscPage } from '../detail-note-esc/detail-note-esc';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
/**
 * Generated class for the NotasEscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Post{
  folio:string,
  fecha:string,
  folioucs:string,
  folioInt:string,
  horaRec:string,
  horaAten:string,
  fechaRec:string,
  nombre:string,
  direccion:string,
  colonia:string,
  telefono:string,
  delegacion:string,
  region:string,
  sector:string,
  cuadrante:string,
  tipo_aten:string,
  especie:string,
  
  patrullas:string,
  elementos:string,
  observaciones:string,
  image: string,
  usuariostring,
  latitud:string,
  longitud:string
}
interface Post1{

  fecha:string,
  folioucs:string,
  folioInt:string,
  horaRec:string,
  horaAten:string,
  fechaRec:string,
  nombre:string,
  direccion:string,
  colonia:string,
  telefono:string,
  delegacion:string,
  region:string,
  sector:string,
  cuadrante:string,
  tipo_aten:string,
  especie:string,
  
  patrullas:string,
  elementos:string,
  observaciones:string,
  image: string,
  usuariostring,
  latitud:string,
  longitud:string
}
interface Post2{

  fecha:string,
  folioucs:string,
  folioInt:string,
  horaRec:string,
  horaAten:string,
  fechaRec:string,
  nombre:string,
  direccion:string,
  colonia:string,
  telefono:string,
  delegacion:string,
  region:string,
  sector:string,
  cuadrante:string,
  tipo_aten:string,
  especie:string,
  
  patrullas:string,
  elementos:string,
  observaciones:string,
  image: string,
  usuariostring,
  latitud:string,
  longitud:string
}
interface Post3{

  fecha:string,
  folioucs:string,
  folioInt:string,
  horaRec:string,
  horaAten:string,
  fechaRec:string,
  nombre:string,
  direccion:string,
  colonia:string,
  telefono:string,
  delegacion:string,
  region:string,
  sector:string,
  cuadrante:string,
  tipo_aten:string,
  especie:string,
  
  patrullas:string,
  elementos:string,
  observaciones:string,
  image: string,
  usuariostring,
  latitud:string,
  longitud:string
}

@Component({
  selector: 'page-notas-esc',
  templateUrl: 'notas-esc.html',
})

export class NotasEscPage {
  post:{folio:string;
    fecha:string;
    folioucs:string;
    folioInt:string;
    horaRec:string;
    horaAten:string;
    fechaRec:string;
    nombre:string;
    direccion:string;
    colonia:string;
    telefono:string;
    delegacion:string;
    region:string;
    sector:string;
    cuadrante:string;
    tipo_aten:string;
    especie:string;
    traslado:string
    patrullas:string;
    elementos:string;
    observaciones:string;
    image: string;
    usuariostring;
    latitud:string;
    longitud:string;}
  postsCol:AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  posts1: Observable<Post1[]>;
  posts2: Observable<Post2[]>;
  posts3: Observable<Post3[]>;
  types_aten=[];
  especyes=[];
  constructor(private afs:AngularFirestore,
              public notesService:NotesService){
    notesService.getTypes_aten()
    .valueChanges()
      .subscribe( tipos_aten => {
       this.types_aten = tipos_aten;
   });
 
   notesService.getEspecies()
   .valueChanges()
     .subscribe( especies => {
      this.especyes = especies;
  });
  
 
  
  }


  ngOnInit(){
    this.postsCol = this.afs.collection('reportes_bva_policia', ref => ref.where('tipo_aten.nombre','==','Ingresos'));
    this.posts = this.postsCol.valueChanges();
    this.postsCol = this.afs.collection('reportes_bva_policia', ref => ref.where('tipo_aten.nombre','==','Traslado a instituciones: -CAVD -PROFEPA'));
    this.posts1 = this.postsCol.valueChanges();
    this.postsCol = this.afs.collection('reportes_bva_policia', ref => ref.where('tipo_aten.nombre','==','Adopciones'));
    this.posts2 = this.postsCol.valueChanges();
    this.postsCol = this.afs.collection('reportes_bva_policia', ref => ref.where('tipo_aten.nombre','==','Ingresos').where('especie.nombre','==','Perro'));
    this.posts3 = this.postsCol.valueChanges();


  }

addPost(){
  
  this.afs.collection('reportes_bva_esc').add(
    {
      'folioInt':this.post.folioInt,
      'fechaRec':this.post.fechaRec,
      'especie':this.post.especie,
      'observaciones':this.post.observaciones,
      'traslado':this.post.traslado,
      'patrullas':this.post.patrullas

    }
  )
}
  
}

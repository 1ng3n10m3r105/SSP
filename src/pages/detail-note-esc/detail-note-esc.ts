import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';
import { DetalleBvaPage } from '../detalle-bva/detalle-bva';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { NotesService } from '../../services/note.service';
import { NotasEscPage } from '../notas-esc/notas-esc';
/**
 * Generated class for the DetailNoteEscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-note-esc',
  templateUrl: 'detail-note-esc.html',
})


export class DetailNoteEscPage  {

constructor( private navCtrl: NavController){

}

openNewUserModal(){
  this.navCtrl.push(NotasEscPage);
 
}

  /*docRef = null;
  query = null;

  note={nom:null}
  private snapshotChangesSubscription: any;
  constructor(private db: AngularFirestore,
              private firebaseService: FirebaseService,
              private navCtrl: NavController,
              ) {
                
                
// Create a reference to the cities collection  ,ref => ref.orderBy ( 'edad' )
let citiesRef = db.collection('epl/');


// Create a query against the collection.
citiesRef.ref.where('club', '==', 'barcelona').get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {

let cont =doc.isEqual.length;
cont++;

console.log(this.array);


  });
 })
 .catch(function(error) {
   console.log("Error getting documents: ", error);
  });
  
              }

  */
}

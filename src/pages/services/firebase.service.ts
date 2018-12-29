import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  getReporteBVA(){
    return new Promise<any>((resolve, reject) => {
      
      this.snapshotChangesSubscription = this.afs.collection('reportes_bva_policia').snapshotChanges()
      .subscribe(notas => {
        resolve(notas);
      })
    });
  }

  unsubscribeOnLogOut(){
   
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateReporteBVA(reportKey, value){
    return new Promise<any>((resolve, reject) => {
   
      this.afs.collection('reportes_bva_policia').doc(reportKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteReporteBVA(reportkKey){
    return new Promise<any>((resolve, reject) => {
    
      this.afs.collection('reportes_bva_policia').doc(reportkKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createReporteBVA(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('reportes_bva_policia').add({
      
        fecha:value.fecha,
        folioucs:value.folioucs,
        folioInt:value.folioInt,
        horaRec:value.horaRec,
        horaAten:value.horaAten,
        fechaRec:value.fechaRec,
        nombre:value.nombre,
        direccion:value.direccion,
        colonia:value.colonia,
        telefono:value.telefono,
        delegacion:value.delegacion,
        region:value.region,
        sector:value.sector,
        cuadrante:value.cuadrante,
        tipo_aten:value.tipo_aten,
        especie:value.especie,
        
        patrullas:value.patrullas,
        elementos:value.elementos,
        observaciones:value.observaciones,
        image: value.image,
        usuario:value.usuario,
        latitud:value.latitud,
        longitud:value.longitud
     
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }




  getDelegation(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('delegaciones').doc(currentUser.uid).collection('delegacion').snapshotChanges()
      .subscribe(notas => {
        resolve(notas);
      })
    });
  }



  updateDelegation(reportKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('delegaciones').doc(currentUser.uid).collection('delegacion').doc(reportKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteDelegation(reportkKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('delegaciones').doc(currentUser.uid).collection('delegacion').doc(reportkKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createDelegation(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('delegaciones').doc(currentUser.uid).collection('delegacion').add({
        delegacion: value.delegacion
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }




  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }



}

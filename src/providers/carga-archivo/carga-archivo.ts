
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {
  imagenes:archivoSubir[]=[];
  constructor(public afdb:AngularFireDatabase,private toastCtrl: ToastController) {
  
  }

  cargar_imagen_firebase( archivo:archivoSubir ){
    let promesa = new Promise((resolve, reject)=>{



      let storeRef= firebase.storage().ref();
      let nombreArchivo = new Date().valueOf().toString();

      this.mostrar_toast('Nota creada corectamente');
      let uploadTask : firebase.storage.UploadTask = 
      storeRef.child(`img/${nombreArchivo}`)
      .putString(archivo.img, 'base64', {contentType:'image/jpeg' });

       

                uploadTask.on('state_changed',
                (snapshot: firebase.storage.UploadTaskSnapshot) => {}, 
                (error) => { 
                console.log("error en carga");
                console.log(JSON.stringify(error));
                this.mostrar_toast(JSON.stringify(error));
                reject(); //Aqui le dice a la promesa que fallo
                },
                () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                let url = downloadURL;
                this.crear_post(archivo.titulo,url,nombreArchivo );
                resolve();  //aqui REGRESO EL URL Y DEBERIA SER STRING , ¿nO?
                });
                }
                );


    });
      return promesa;
  }

  public crear_post(titulo:string, url:string, nombreArchivo:string){
    let post:archivoSubir={
      titulo:titulo,
      img:url, 
      key:nombreArchivo
    };  
    
    console.log(JSON.stringify(post));

    //this.afdb.list('post').push(post);
    

  }

  mostrar_toast(mensaje:string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass:'access',
    }).present();
  }

}
interface archivoSubir{
    titulo:string;
    img:string;
    key?:string;
}

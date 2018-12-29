import { Component} from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {WatchanimalPage} from '../watchanimal/watchanimal';
import { NotesService } from '../../services/note.service';
import { DelegationsPage } from '../delegations/delegations';
import { TipoAtencionPage } from '../tipo-atencion/tipo-atencion';
import { EspeciePage } from '../especie/especie';
import { NotasEscPage } from '../notas-esc/notas-esc';
import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase} from 'angularfire2/database'
import { AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WatchusecPage } from '../watchusec/watchusec';
import { ViewBvaPage } from '../view-bva/view-bva';
import { DetailNoteEscPage } from '../detail-note-esc/detail-note-esc';
import { AyudaPage } from '../ayuda/ayuda';
import { WatchalcoholimetroPage } from '../watchalcoholimetro/watchalcoholimetro';
import { DetailAlcoholimetroPage } from '../detail-alcoholimetro/detail-alcoholimetro';
import { WatchvigilanciaPage } from '../watchvigilancia/watchvigilancia';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profileData : Observable<UserProvider>
  notes = [];
  delegations=[];
  types_aten=[];
  especyes=[];
  
  selectedPhoto;
  loading;
  currentImage;
  imageName;


  username: string;
  imgurl: string;


constructor(public loadinCtrl: LoadingController,
  public camera: Camera, public loadingCtrl: LoadingController,private afAuth:AngularFireAuth,private afDatabase: AngularFireDatabase,public navParams: NavParams,public nav: NavController, public notesService : NotesService,private modalCtrl:ModalController,private toast: ToastController) {
  this.imgurl = './assets/imgs/logoprofile.png'; 
  this.nav = nav;
  this.username = window.localStorage.getItem('username');
 notesService.getNotes()
  .valueChanges()
    .subscribe( notas => {
     this.notes = notas;
 });


  }
  updateproceed() {
   
    

    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      

    })
    loader.present();
    this.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        const options: CameraOptions = {
          quality: 100,
          targetWidth:200,
          targetHeight: 200,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
    
        }
        this.camera.getPicture(options).then((ImageData) => {
            this.loading = this.loadinCtrl.create({
              content: 'Taking photo :) '
            });
            
            this.loading.present();
            this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
            this.loading.dismiss();
            this.imgurl = 'data:image/jpeg;base64,'+ImageData;
        }, (err)=>{
          console.log(err);
        });
      }
      else {
        alert(res);
      }
    })
  }
  
  dataURLtoBlob(dataURL){

    let binary = atob(dataURL.split(',')[1]);
    let array =[];
    for (var index = 0; index < binary.length; index++) {
       array.push(binary.charCodeAt(index));
      
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});

  }

 public createNote(){
  this.nav.push(ViewBvaPage, {id:0});

  }
  public createNoteAlcoholimetro(){
    this.nav.push(WatchalcoholimetroPage, {id:0});
  
    }
  public goToDetailAlcoholimetro(id){
    this.nav.push(WatchalcoholimetroPage, {id:id});
  }
  public createNoteVigilancia(){
    this.nav.push(WatchvigilanciaPage, {id:0});
  
    }
  public goToDetailVigilancia(id){
    this.nav.push(WatchvigilanciaPage, {id:id});
  }
  public goToDetailUsec(id){
    this.nav.push(WatchusecPage, {id:id});
  }
  public createNoteUsec(){
   this.nav.push(WatchusecPage, {id:0});
 
   }
  public goToDetailEsc(id){
    this.nav.push(DetailNoteEscPage, {id:id});
  }
  public createNoteEsc(){
   this.nav.push(DetailNoteEscPage, {id:0});
   }
  
  public goToDetailDelegation(id){
    this.nav.push(DelegationsPage, {id:id});
  }
  public createDelegation(){
   this.nav.push(DelegationsPage, {id:0});
   }

   public goToDetailType_aten(id){
    this.nav.push(TipoAtencionPage, {id:id});
  }
  public createType_aten(){
   this.nav.push(TipoAtencionPage, {id:0});
   }
   public goToDetailEspecie(id){
    this.nav.push(EspeciePage, {id:id});
  }
  public createEspecie(){
   this.nav.push(EspeciePage, {id:0});
   }

  signOut(){
    this.nav.setRoot('LoginPage');
    window.location.reload();
  }
  mostrar_modal(){
    let modal = this.modalCtrl.create(DelegationsPage);
    modal.present();
  }
  mostrar_modal1(){
    let modal = this.modalCtrl.create(TipoAtencionPage);
    modal.present();
  }
  mostrar_modal2(){
    let modal = this.modalCtrl.create(EspeciePage);
    modal.present();
  }

  mostrar_modalayuda(){
    let modal = this.modalCtrl.create(AyudaPage);
    modal.present();
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.toast.create({
          message:`Bienvenído, ${data.displayName}`,
          duration:4000,
          cssClass:"access",
          position:"top"
        }).present();
        this.profileData = <any>this.afDatabase.object(`users/${data.uid}`).valueChanges();
      }
      else{
        this.toast.create({
          message:`Invalida autenticación`,
          duration:3000,
          cssClass:"error1"
        }).present();
      }
    })
  }
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.afAuth.auth.currentUser.updateProfile({
            displayName: this.afAuth.auth.currentUser.displayName,
          
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.afAuth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })  
    })
    return promise;
}




}

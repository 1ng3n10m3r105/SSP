import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, NavParams, AlertController, LoadingController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NotesService } from '../../services/note.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

interface Post{
  latitud:string,
  longitud:string
}
@Component({
  selector: 'page-detalle-bva',
  templateUrl: 'detalle-bva.html'
})
export class DetalleBvaPage {
  postsCol:AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  validations_form: FormGroup;
  image: any=[];
  item: any=[];
  loading: any;
  delegation={id:null,nombre:null};
  delegations=[];
  type_aten={id:null,nombre:null};
  types_aten=[];
  especye={id:null,nombre:null};
  especyes=[];
  user={id:null,displayName:null,matricula:null,puesto:null,latitud:null,longitud:null};
  users=[];



  
  titulo:string="";
  imagenPreview:string="";
  imagen64:string;
  usuario: any;
  latitud:any;
  longitud:any;
  show=true;
  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    public notesService:NotesService,
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore
   
  ) {
   

    this.loading = this.loadingCtrl.create();
    notesService.getDelegations()
    .valueChanges()
      .subscribe( delegaciones => {
       this.delegations = delegaciones;
   });

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
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.user.displayName= <any>data.displayName;
        this.user.matricula=<any>data.email;
        this.user.id=<any>data.uid;
        
      }
    });

    

 
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.item = this.navParams.get('data');
    this.image  = this.item.image;
    this.validations_form = this.formBuilder.group({
      folioucs: new FormControl(this.item.folioucs, Validators.required),
      folioInt: new FormControl(this.item.folioInt, Validators.required),
      horaAten: new FormControl(this.item.horaAten, Validators.required),
      nombre: new FormControl(this.item.nombre, Validators.required),
      direccion: new FormControl(this.item.direccion, Validators.required),
      colonia: new FormControl(this.item.colonia, Validators.required),
      telefono: new FormControl(this.item.telefono, Validators.required),
      delegacion: new FormControl(this.item.delegacion, Validators.required),
      region: new FormControl(this.item.region, Validators.required),
      sector: new FormControl(this.item.sector, Validators.required),
      cuadrante: new FormControl(this.item.cuadrante, Validators.required),
      tipo_aten: new FormControl(this.item.tipo_aten, Validators.required),
      especie: new FormControl(this.item.especie, Validators.required),
      patrullas: new FormControl(this.item.patrullas, Validators.required),
      elementos: new FormControl(this.item.elementos, Validators.required),
      observaciones: new FormControl(this.item.observaciones, Validators.required),
      fecha: new FormControl(this.item.fecha, Validators.required),    
      horaRec: new FormControl(this.item.horaRec, Validators.required),
      fechaRec: new FormControl(this.item.fechaRec, Validators.required),
      latitud: new FormControl(this.item.latitud, Validators.required),
      longitud: new FormControl(this.item.longitud, Validators.required),


    });
  }
  

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      
      fecha:value.fecha,
      folioucs:value.folioucs,
      folioInt:value.folioInt,
      fechaRec:value.fechaRec,
      horaAten:value.horaAten,
      horaRec:value.horaRec,
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
      usuario:{id:<any>this.user.id,displayName:<any>this.user.displayName,matricula:<any>this.user.matricula},
      patrullas:value.patrullas,
      elementos:value.elementos,
      observaciones:value.observaciones,
      image: this.image,
      longitud:value.longitud,
      latitud:value.latitud
      

    }
    this.firebaseService.updateReporteBVA(this.item.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  delete() {
    this.show =false;
    this.firebaseService.deleteReporteBVA(this.item.id);
    alert('Nota eliminada con exito');
    this.navCtrl.pop();

   
  }


  
  compareFn(a:{id:number,name:string} , b:{id:number,name:string}){
    if(a.id === b.id){
      return true;
    }
    return false;
   }

   
}

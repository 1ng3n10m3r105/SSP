import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, LoadingController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { NotesService } from '../../services/note.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import * as moment from 'moment';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CreateBvaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-bva',
  templateUrl: 'create-bva.html',
})

export class CreateBvaPage {
  validation_messages = {
    'folioucs': [
      { type: 'required', message: 'Campo requerido.' },
     
    ],
    'folioInt': [
      { type: 'required', message: 'Campo requerido.' },
      ],
    'horaAten': [
      { type: 'required', message: 'Campo requerido.' },
 
    ],
    'nombre': [
      { type: 'required', message: 'Campo requerido.' },
    
    ],
    'direccion': [
      { type: 'required', message: 'Campo requerido.' },
   
    ],
    'colonia': [
      { type: 'required', message: 'Campo requerido.' },
     
    ],
    'telefono': [
      { type: 'required', message: 'Campo requerido.' },
   
    ],
    'delegacion': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'region': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'sector': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'cuadrante': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'tipo_aten': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'especie': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'patrullas': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'elementos': [
      { type: 'required', message: 'Campo requerido.' },
    ],
    'observaciones': [
      { type: 'required', message: 'Campo requerido.' },
    ]
  };
  
  user={id:null,displayName:null,matricula:null,puesto:null,latitud:null,longitud:null};
  users=[];
  validations_form: FormGroup;
  image: any = [];
  loading: any;

  delegation={id:null,nombre:null};
  delegations=[];
  type_aten={id:null,nombre:null};
  types_aten=[];
  especye={id:null,nombre:null};
  especyes=[];
  titulo:string="";
  imagenPreview:string="";
  imagen64:string;
  usuario: any;
  latitud:any;
  longitud:any;

  constructor(
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public imagePicker: ImagePicker,
    public firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
    public notesService:NotesService,
    private camera: Camera,
    public _cap:CargaArchivoProvider,
    private modalCtrl:ModalController,
    public geolocation: Geolocation,
    private afAuth:AngularFireAuth,
  ) {
    
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.user.displayName= <any>data.displayName;
        this.user.matricula=<any>data.email;
        this.user.id=<any>data.uid;
        
      }


    
    })

    this.geolocation.getCurrentPosition().then((geposition:Geoposition)=>{
      this.latitud = geposition.coords.latitude;
      this.longitud = geposition.coords.longitude;
 
     })
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
 

  }

  ionViewWillLoad() {
    this.resetFields()
  }
  
  resetFields() {
   
    this.validations_form = this.formBuilder.group({
   

      folioucs: new FormControl('', Validators.required),
      folioInt: new FormControl('', Validators.required),
      horaAten: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      colonia: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      delegacion: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      sector: new FormControl('', Validators.required),
      cuadrante: new FormControl('', Validators.required),
      tipo_aten: new FormControl('', Validators.required),
      especie: new FormControl('', Validators.required),
      patrullas: new FormControl('', Validators.required),
      elementos: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
  
      
  
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(value) {
    let data = {
     
      fecha:moment().lang('es').format('LL'),
      folioucs:value.folioucs,
      folioInt:value.folioInt,
      fechaRec:moment().lang('es').format('LL'),
      horaAten:value.horaAten,
      horaRec:moment().format('LTS'),
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
      image: this.imagenPreview,
      usuario:{id:<any>this.user.id,displayName:<any>this.user.displayName,matricula:<any>this.user.matricula},
      latitud: <any>this.latitud,
      longitud:<any>this.longitud,

      
     
    }

      
    this.firebaseService.createReporteBVA(data)
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss();
        }
      );
      this.crear_post();

      
  }




  mostrar_camara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;
    }, (err) => {
     // Handle error
     console.log("Error en camara", JSON.stringify(err));
    });

  }

  selecionar_foto() {
    const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG, 
    mediaType: this.camera.MediaType.PICTURE, 
    sourceType: 2 //DESDE Libreria
    };
    this.camera.getPicture(options).then((imageData) => {
    this.imagenPreview = `data:image/jpeg;base64,` + imageData;
    this.imagen64= imageData;
    
    }, (err) => {
    console.log("Error en galería: ", JSON.stringify(err));
    });
    }

    crear_post(){
      let archivo = {
        img:this.imagen64,
       
      }
      this._cap.cargar_imagen_firebase(<any>archivo)
      .then(()=>this.cerrar_modal());
    }

    cerrar_modal(){
      this.viewCtrl.dismiss();
    }


  
  



  compareFn(a:{id:number,name:string} , b:{id:number,name:string}){
    if(a.id === b.id){
      return true;
    }
    return false;
   }


}

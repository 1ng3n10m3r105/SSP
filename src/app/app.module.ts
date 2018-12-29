import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { CustomFormsModule } from 'ng2-validation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetalleBvaPage } from '../pages/detalle-bva/detalle-bva';
import { ViewBvaPage } from '../pages/view-bva/view-bva';
import { CreateBvaPage } from '../pages/create-bva/create-bva';
import { DetailNoteEscPage } from '../pages/detail-note-esc/detail-note-esc';
import { DelegationsPage } from '../pages/delegations/delegations';
import { DetailUsecPage } from '../pages/detail-usec/detail-usec';
import { LoginPage } from '../pages/login/login';
import { EspeciePage } from '../pages/especie/especie';
import { WatchusecPage } from '../pages/watchusec/watchusec';
import { SignupPage } from '../pages/signup/signup';
import { NotasEscPage } from '../pages/notas-esc/notas-esc';
import { TipoAtencionPage } from '../pages/tipo-atencion/tipo-atencion';
import { AngularFireModule } from '@angular/fire';
import { FIREBASE_INFO } from './firebase.info';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../services/note.service';
import { Camera } from '@ionic-native/camera';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UserProvider } from '../providers/user/user';
import { AuthService } from '../pages/services/auth.service';
import { FirebaseService } from '../pages/services/firebase.service';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { Geolocation } from '@ionic-native/geolocation';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { DetailAlcoholimetroPage } from '../pages/detail-alcoholimetro/detail-alcoholimetro';
import { WatchalcoholimetroPage } from '../pages/watchalcoholimetro/watchalcoholimetro';
import { WatchvigilanciaPage } from '../pages/watchvigilancia/watchvigilancia';
import { DetailVigilanciaPage } from '../pages/detail-vigilancia/detail-vigilancia';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateBvaPage,
    DetalleBvaPage,
    ViewBvaPage,
    DelegationsPage,
    DetailUsecPage,
    LoginPage,
    EspeciePage,
    WatchusecPage,
    DetailNoteEscPage,
    SignupPage,
    NotasEscPage,
    TipoAtencionPage,
    DetalleBvaPage,
    AyudaPage,
    DetailAlcoholimetroPage,
    WatchalcoholimetroPage,
    WatchvigilanciaPage,
    DetailVigilanciaPage
   
   


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_INFO.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    AngularFirestoreModule,    
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateBvaPage,
    DetalleBvaPage,
    ViewBvaPage,
    DelegationsPage,
    DetailUsecPage,
    LoginPage,
    EspeciePage,
    WatchusecPage,
    DetailNoteEscPage,
    SignupPage,
    NotasEscPage,
    TipoAtencionPage,
    AyudaPage,
    DetailAlcoholimetroPage,
    WatchalcoholimetroPage,
    WatchvigilanciaPage,
    DetailVigilanciaPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NotesService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase ,
    UsuarioProvider,
    UserProvider,
    AuthService,
   ImagePicker,
    FirebaseService,
    CargaArchivoProvider,
    Geolocation
  
  ]
})
export class AppModule {}

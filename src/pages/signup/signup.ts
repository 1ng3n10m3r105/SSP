import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: '',
    puesto:'',
    matricula:''
  }

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(    private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

 /* signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      cssClass:"error"
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '' || this.newuser.matricula == '' || this.newuser.puesto == '') {
      toaster.setMessage('Todos los campos son obligatorios.');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('La contraseña no es segura. Intenta dar más de seis caracteres.');
      toaster.present();
    
    }
    else if (this.newuser.matricula.length < 6 || this.newuser.matricula.length > 6 ) {
      toaster.setMessage('La matricula no es segura. Intente solo con 6  digitos.');
      toaster.present();
    
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Espere un momento'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push(LoginPage);
        else
          alert('Error' + res);
      })
    }
  }  */
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email requerido.' },
      { type: 'pattern', message: 'ingresa email valido .' }
    ],
    'password': [
      { type: 'required', message: 'Password requerido.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' }
    ]
  };

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value){
    this.userservice.adduser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Tu cuenta ha sido creada. Por favor Iniciar sesión.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goLoginPage(){
    this.navCtrl.pop();
  }

  goback() {
    this.navCtrl.setRoot(LoginPage);
  }

}

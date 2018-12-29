import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


import { AuthService } from '../services/auth.service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email  requerido.' },
     { type: 'pattern', message: 'Por favor ingresa un email valido.' }
   ],
   'password': [
     { type: 'required', message: 'Contraseña requerido.' },
     { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {}

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

tryLogin(value){
   
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(HomePage);
    }, err => {
  
      this.toastCtrl.create({
        message:"No hay registro de usuario correspondiente a este identificador.",
        duration:5000,
        cssClass:"error",
      }).present();
    })
  }

 
  signup(){
    this.navCtrl.push(SignupPage);
    }
   
}

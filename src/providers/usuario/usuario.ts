import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  usuario: Credenciales = {};

  constructor() { }

  cargarUsuario(
    
    email:string,
    password:string,
    
  ){
   
    this.usuario.emaili = email;
    this.usuario.password = password;
  }

}

export interface Credenciales{
  
  emaili? : string;
  password?:string;
  }
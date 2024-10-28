import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({id: 0, nombre: '', apellido: '', avatar: ''}); 

  constructor(private cookiesService: CookieService) {
    // Aca deberia estar reconstruyendo y validando el token en caso de volver a cargar la pagina o cerrar y abrir el navegador
    let token = this.obtenerTokenPrevio();
    let usuario = this.obtenerUsuarioPrevio();
  
    if (this.tokenValido(token)) {
      console.log('Se recupero una session valida');
      this.isUserLogged = new BehaviorSubject<boolean>(true);
      this.currentUser = new BehaviorSubject<Usuario>(usuario);
    } else {
      this.limpiarSession();
    }
  }

  limpiarSession() {
    this.cookiesService.delete('token');
    this.cookiesService.delete('usuario');
    this.isUserLogged.next(false);
    this.currentUser.next({id: 0, nombre: '', apellido: '', avatar: ''}); 
  }

  guardarSession(token: String, usuario: Usuario) {
    this.cookiesService.set('token', token.toString());
    this.cookiesService.set('usuario', JSON.stringify(usuario));
    this.isUserLogged.next(true);
    this.currentUser.next(usuario);
  }

  obtenerUsuarioPrevio(): Usuario {
    let usuario = this.cookiesService.get('usuario');
    return usuario ? JSON.parse(usuario) : {id: 0, nombre: '', apellido: '', avatar: ''};
  }

  obtenerTokenPrevio(): string {
    return this.cookiesService.get('token') || '';
  }

  estaLogueado(): boolean {
    console.log('Se esta validando si el usuario esta logueado');
    console.log('Usuario en cookie: ' + this.cookiesService.get('usuario'));
    console.log('Token en cookie: ' + this.cookiesService.get('token'));
    console.log('Usuario en BehaviorSubject: ' + this.currentUser.value);
    
    
    
    let final = this.cookiesService.get('usuario') != '' && this.cookiesService.get('token')!='' && this.isUserLogged.value;
    
    return final;
  }

  obtenerUsuario(): Usuario {
    return this.currentUser.value;
  }

  tokenValido(token: string): boolean {
    let decodedToken = this.decodificarToken(token);
    let valor = new Date() <= new Date(decodedToken.exp * 1000)
    console.log('session exporada: ' + valor);
    
    return decodedToken && (new Date() <= new Date(decodedToken.exp * 1000));
  }

  decodificarToken(token: string): any {
    try{
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
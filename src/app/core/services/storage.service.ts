import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({id: 0, nombre: '', apellido: '', avatar: ''}); 

  constructor() {
    // Aca deberia estar reconstruyendo y validando el token en caso de volver a cargar la pagina o cerrar y abrir el navegador
    let token = this.obtenerTokenPrevio();
    let usuario = this.obtenerUsuarioPrevio();
  
    if (this.tokenValido(token)) {
      this.isUserLogged = new BehaviorSubject<boolean>(true);
      this.currentUser = new BehaviorSubject<Usuario>(usuario);
    } else {
      this.limpiarSession();
    }
  }

  limpiarSession() {
    localStorage.clear();
    this.isUserLogged.next(false);
    this.currentUser.next({id: 0, nombre: '', apellido: '', avatar: ''}); 
  }

  guardarSession(token: String, usuario: Usuario) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.isUserLogged.next(true);
    this.currentUser.next(usuario);
  }

  obtenerUsuarioPrevio(): Usuario {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  obtenerTokenPrevio(): string {
    return localStorage.getItem('token') || '';
  }

  estaLogueado(): boolean {
    return this.isUserLogged.value;
  }

  obtenerUsuario(): Usuario {
    return this.currentUser.value;
  }

  tokenValido(token: string): boolean {
    let decodedToken = this.decodificarToken(token);
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
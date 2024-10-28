import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({ id: 0, nombre: '', apellido: '', avatar: '' });

  constructor() {
    this.reconstruirSession();
  }

  private reconstruirSession(): void {
    const token = this.obtenerTokenPrevio();
    const usuario = this.obtenerUsuarioPrevio();

    if (token) {
      // Verificamos si el usuario y el token existen en localStorage
      this.isUserLogged.next(true);
      this.currentUser.next(usuario);
    } else {
      this.limpiarSession();
    }
  }

  limpiarSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isUserLogged.next(false);
    this.currentUser.next({ id: 0, nombre: '', apellido: '', avatar: '' });
  }

  guardarSession(token: string, usuario: Usuario): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.isUserLogged.next(true);
    this.currentUser.next(usuario);
  }

  obtenerUsuarioPrevio(): Usuario {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : { id: 0, nombre: '', apellido: '', avatar: '' };
  }

  obtenerTokenPrevio(): string {
    return localStorage.getItem('token') || '';
  }

  estaLogueado(): boolean {
    const usuario = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    return usuario !== null && token !== null && this.isUserLogged.value;
  }

  obtenerUsuario(): Usuario {
    return this.currentUser.value;
  }

  decodificarToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
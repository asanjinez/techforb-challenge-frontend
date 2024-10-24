import { Component } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Usuario } from '../../core/models/usuario';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  estaLogueado: boolean = false;
  usuarioActual: Usuario|null = null;
  constructor(private storageService: StorageService ) {}

  ngOnInit() {
    this.storageService.isUserLogged.subscribe(isLogged => {
      this.estaLogueado = isLogged;
    });

    this.storageService.currentUser.subscribe(user => {
      this.usuarioActual = user;
    });
  }
}
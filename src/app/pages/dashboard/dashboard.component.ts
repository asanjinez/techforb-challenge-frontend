import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Usuario } from '../../core/models/usuario';
import { MonitoreoComponent } from "../../modules/components/monitoreo/monitoreo.component";
import { PlantasComponent } from '../../modules/components/plantas/plantas.component';
import { ParametrosComponent } from '../../modules/components/parametros/parametros.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MonitoreoComponent, ParametrosComponent, PlantasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
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
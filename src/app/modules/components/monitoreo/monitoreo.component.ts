import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { PlantasService } from '../../../core/services/plantas.service';
import { Planta } from '../../../core/models/planta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitoreo',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './monitoreo.component.html',
  styleUrl: './monitoreo.component.scss'
})
export class MonitoreoComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  
  lecturasOk = 0;
  alertasMedias = 0;
  alertasRojas = 0;
  sensoresDeshabilitados = 0;

  cards = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Lecturas Ok', cols: 4, rows: 1, icon: 'check', cantidad: this.lecturasOk, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Alertas medias', cols: 4, rows: 1, icon: 'priority_high', cantidad: this.alertasMedias, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Alertas rojas', cols: 4, rows: 1, icon: 'warning', cantidad: this.alertasRojas, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Sensores deshabilitados', cols: 4, rows: 1, icon: 'close', cantidad: this.sensoresDeshabilitados, color: 'rgba(250, 218, 188, 0.5)' }
        ];
      } else {
        return [
          { title: 'Lecturas Ok', cols: 1, rows: 1, icon: 'check', cantidad: this.lecturasOk, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Alertas medias', cols: 1, rows: 1, icon: 'priority_high', cantidad: this.alertasMedias, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Alertas rojas', cols: 1, rows: 1, icon: 'warning', cantidad: this.alertasRojas, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Sensores deshabilitados', cols: 1, rows: 1, icon: 'close', cantidad: this.sensoresDeshabilitados, color: 'rgba(250, 218, 188, 0.5)' }
        ];
      }
    })
  );

  constructor(private plantasService: PlantasService) { }
  ngOnInit(): void {
    this.plantasService.getPlantas().subscribe(response => {
      if (response.success && response.data) {
        let plantas:Planta[] = response.data;
        this.lecturasOk = this.obtenerCantidadLecturasOk(plantas);
        this.alertasMedias = this.obtenerCantidadAlertasMedias(plantas);
        this.alertasRojas = this.obtenerCantidadAlertasRojas(plantas);
        this.sensoresDeshabilitados = this.obtenerCantidadSensoresDeshabilitados(plantas);;
      }
    });
  }

  obtenerCantidadLecturasOk(plantas: Planta[]): number {
    return plantas.map(planta => planta.numeroLecturas).reduce((a, b) => a + b, 0);
  }

  obtenerCantidadAlertasMedias(plantas: Planta[]): number {
    return plantas.map(planta => planta.numeroAlertasMedias).reduce((a, b) => a + b, 0);
  }

  obtenerCantidadAlertasRojas(plantas: Planta[]): number {
    return plantas.map(planta => planta.numeroAlertasRojas).reduce((a, b) => a + b, 0);
  }

  obtenerCantidadSensoresDeshabilitados(plantas: Planta[]): number {
    return plantas.map(planta => planta.sensoresDeshabilitados).reduce((a, b) => a + b, 0);
  }


}
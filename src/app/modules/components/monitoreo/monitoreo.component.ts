import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, map } from 'rxjs';
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
  cards = new BehaviorSubject<any[]>([])
  private plantas: Planta[] = [];

  constructor(private plantasService: PlantasService) { }
  ngOnInit(): void {
    // Obtener plantas primero
    this.plantasService.lista$.subscribe((plantas) => {
      this.plantas = plantas;
      this.actualizarEstadisticas();
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(({ matches }) => {
      this.actualizarEstadisticas(matches);
    });
  }

  actualizarEstadisticas(isDesktop:boolean = false): void {
    let lecturasOk = this.obtenerCantidadLecturasOk(this.plantas);
    let alertasMedias = this.obtenerCantidadAlertasMedias(this.plantas);
    let alertasRojas = this.obtenerCantidadAlertasRojas(this.plantas);
    let sensoresDeshabilitados = this.obtenerCantidadSensoresDeshabilitados(this.plantas);
    
    this.cards.next([
      { title: 'Lecturas Ok', cols: isDesktop ? 4 : 1, rows: 1, icon: 'check', cantidad: lecturasOk, color: 'rgba(235, 248, 249, 0.5)' },
      { title: 'Alertas medias', cols: isDesktop ? 4 : 1, rows: 1, icon: 'priority_high', cantidad: alertasMedias, color: 'rgba(253, 207, 87, 0.5)' },
      { title: 'Alertas rojas', cols: isDesktop ? 4 : 1, rows: 1, icon: 'warning', cantidad: alertasRojas, color: 'rgba(246, 150, 129, 0.5)' },
      { title: 'Sensores deshabilitados', cols: isDesktop ? 4 : 1, rows: 1, icon: 'close', cantidad: sensoresDeshabilitados, color: 'rgba(250, 218, 188, 0.5)' }
    ]);


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
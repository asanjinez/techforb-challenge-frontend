import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PlantasService } from '../../../core/services/plantas.service';
import { Planta } from '../../../core/models/planta';
import { map } from 'rxjs';

@Component({
  selector: 'app-parametros',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.scss'
})
export class ParametrosComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  plantas: Planta[] = [];
  cards = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Temperatura', cols: 4, rows: 2, icon: 'device_thermostat', cantidad:1, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Presion', cols: 4, rows: 2, icon: 'speed', cantidad:123, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Viento', cols: 4, rows: 2, icon: 'air', cantidad:123, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Niveles', cols: 4, rows: 2, icon: 'waves', cantidad:123, color: 'rgba(250, 218, 188, 0.5)' },
          { title: 'Energia', cols: 4, rows: 2, icon: 'battery_charging_full', cantidad:123, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Tension', cols: 4, rows: 2, icon: 'offline_bolt', cantidad:123, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Monoxido de carbono', cols: 4, rows: 2, icon: 'co2', cantidad:123, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Otros gases', cols: 4, rows: 2, icon: 'cloud', cantidad:123, color: 'rgba(250, 218, 188, 0.5)' }
        ];
      } else {
        return [
          { title: 'Temperatura', cols: 1, rows: 1, icon: 'device_thermostat', cantidad:123, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Presion', cols: 1, rows: 1, icon: 'speed', cantidad:123, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Viento', cols: 1, rows: 1, icon: 'air', cantidad:123, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Niveles', cols: 1, rows: 1, icon: 'waves', cantidad:123, color: 'rgba(250, 218, 188, 0.5)' },
          { title: 'Energia', cols: 1, rows: 1, icon: 'battery_charging_full', cantidad:123, color: 'rgba(235, 248, 249, 0.5)' }, 
          { title: 'Tension', cols: 1, rows: 1, icon: 'offline_bolt', cantidad:123, color: 'rgba(253, 207, 87, 0.5)' }, 
          { title: 'Monoxido de carbono', cols: 1, rows: 1, icon: 'co2', cantidad:123, color: 'rgba(246, 150, 129, 0.5)' }, 
          { title: 'Otros gases', cols: 1, rows: 1, icon: 'cloud', cantidad:123, color: 'rgba(250, 218, 188, 0.5)' }
        ];
      }
    })
  );

  constructor (private plantasService: PlantasService) { }

  ngOnInit(): void {
    this.plantasService.lista$.subscribe((plantas) => {
      this.plantas = plantas;
    });
  }
}

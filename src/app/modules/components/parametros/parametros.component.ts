import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PlantasService } from '../../../core/services/plantas.service';
import { Planta } from '../../../core/models/planta';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-parametros',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.scss'
})
export class ParametrosComponent implements OnInit {
  conteos = {
    temperatura: { alta: 0, media: 0, baja: 0 },
    presion: { alta: 0, media: 0, baja: 0 },
    viento: { alta: 0, media: 0, baja: 0 },
    niveles: { alta: 0, media: 0, baja: 0 },
    energia: { alta: 0, media: 0, baja: 0 },
    tension: { alta: 0, media: 0, baja: 0 },
    monoxido: { alta: 0, media: 0, baja: 0 },
    gases: { alta: 0, media: 0, baja: 0 }
  }
  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$: Observable<any[]> = this.cardsSubject.asObservable();
  plantas: Planta[] = [];

  private breakpointObserver = inject(BreakpointObserver);

  constructor (private plantasService: PlantasService) { }

  
  ngOnInit(): void {
    this.plantasService.lista$.subscribe((plantas) => {
      this.plantas = plantas;
      console.log(this.conteos);
      
      this.calcularParametros(); 
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(({ matches }) => {
      this.actualizarCards(matches); 
    });
  }
  
  private actualizarCards(isSmallScreen: boolean) {
    const newCards = isSmallScreen
      ? [
        { title: 'Temperatura', cols: 4, rows: 2, icon: 'device_thermostat', conteos: this.conteos.temperatura, color: 'rgba(235, 248, 249, 0.5)' },
        { title: 'Presion', cols: 4, rows: 2, icon: 'speed', conteos: this.conteos.presion, color: 'rgba(253, 207, 87, 0.5)' }, 
        { title: 'Viento', cols: 4, rows: 2, icon: 'air', conteos: this.conteos.viento, color: 'rgba(246, 150, 129, 0.5)' },
        { title: 'Niveles', cols: 4, rows: 2, icon: 'waves', conteos: this.conteos.niveles, color: 'rgba(250, 218, 188, 0.5)' },
        { title: 'Energia', cols: 4, rows: 2, icon: 'battery_charging_full', conteos: this.conteos.energia, color: 'rgba(235, 248, 249, 0.5)' },
        { title: 'Tension', cols: 4, rows: 2, icon: 'offline_bolt', conteos: this.conteos.tension, color: 'rgba(253, 207, 87, 0.5)' },
        { title: 'Monoxido de carbono', cols: 4, rows: 2, icon: 'co2', conteos: this.conteos.monoxido, color: 'rgba(246, 150, 129, 0.5)' },
        { title: 'Otros gases', cols: 4, rows: 2, icon: 'cloud', conteos: this.conteos.gases, color: 'rgba(250, 218, 188, 0.5)' }
        ]
      : [
        { title: 'Temperatura', cols: 1, rows: 1, icon: 'device_thermostat', conteos: this.conteos.temperatura , color: 'rgba(235, 248, 249, 0.5)' },
        { title: 'Presion', cols: 1, rows: 1, icon: 'speed', conteos: this.conteos.presion, color: 'rgba(253, 207, 87, 0.5)' },
        { title: 'Viento', cols: 1, rows: 1, icon: 'air', conteos: this.conteos.viento, color: 'rgba(246, 150, 129, 0.5)' },
        { title: 'Niveles', cols: 1, rows: 1, icon: 'waves', conteos: this.conteos.niveles, color: 'rgba(250, 218, 188, 0.5)' },
        { title: 'Energia', cols: 1, rows: 1, icon: 'battery_charging_full', conteos: this.conteos.energia, color: 'rgba(235, 248, 249, 0.5)' },
        { title: 'Tension', cols: 1, rows: 1, icon: 'offline_bolt', conteos: this.conteos.tension, color: 'rgba(253, 207, 87, 0.5)' },
        { title: 'Monoxido de carbono', cols: 1, rows: 1, icon: 'co2', conteos: this.conteos.monoxido, color: 'rgba(246, 150, 129, 0.5)' },
        { title: 'Otros gases', cols: 1, rows: 1, icon: 'cloud', conteos: this.conteos.gases, color: 'rgba(250, 218, 188, 0.5)' }
    ];

    this.cardsSubject.next(newCards); 
  }

  private calcularParametros(): void {
    this.conteos = {
      temperatura: { alta: 0, media: 0, baja: 0 },
      presion: { alta: 0, media: 0, baja: 0 },
      viento: { alta: 0, media: 0, baja: 0 },
      niveles: { alta: 0, media: 0, baja: 0 },
      energia: { alta: 0, media: 0, baja: 0 },
      tension: { alta: 0, media: 0, baja: 0 },
      monoxido: { alta: 0, media: 0, baja: 0 },
      gases: { alta: 0, media: 0, baja: 0 }
    };
    this.plantas.forEach(planta => {

      this.conteos.temperatura = {
        alta: this.conteos.temperatura.alta + this.contarParametros(planta.parametros.temperatura).alta,
        media: this.conteos.temperatura.media + this.contarParametros(planta.parametros.temperatura).media,
        baja: this.conteos.temperatura.baja + this.contarParametros(planta.parametros.temperatura).baja
      };
      
      this.conteos.presion = {
        alta: this.conteos.presion.alta + this.contarParametros(planta.parametros.presion).alta,
        media: this.conteos.presion.media + this.contarParametros(planta.parametros.presion).media,
        baja: this.conteos.presion.baja + this.contarParametros(planta.parametros.presion).baja
      };
      this.conteos.viento = {
        alta: this.conteos.viento.alta + this.contarParametros(planta.parametros.viento).alta,
        media: this.conteos.viento.media + this.contarParametros(planta.parametros.viento).media,
        baja: this.conteos.viento.baja + this.contarParametros(planta.parametros.viento).baja
      };
      this.conteos.niveles = {
        alta: this.conteos.niveles.alta + this.contarParametros(planta.parametros.niveles).alta,
        media: this.conteos.niveles.media + this.contarParametros(planta.parametros.niveles).media,
        baja: this.conteos.niveles.baja + this.contarParametros(planta.parametros.niveles).baja
      };
      this.conteos.energia = {
        alta: this.conteos.energia.alta + this.contarParametros(planta.parametros.energia).alta,
        media: this.conteos.energia.media + this.contarParametros(planta.parametros.energia).media,
        baja: this.conteos.energia.baja + this.contarParametros(planta.parametros.energia).baja
      };
      this.conteos.tension = {
        alta: this.conteos.tension.alta + this.contarParametros(planta.parametros.tension).alta,
        media: this.conteos.tension.media + this.contarParametros(planta.parametros.tension).media,
        baja: this.conteos.tension.baja + this.contarParametros(planta.parametros.tension).baja
      };
      this.conteos.monoxido = {
        alta: this.conteos.monoxido.alta + this.contarParametros(planta.parametros.monoxido).alta,
        media: this.conteos.monoxido.media + this.contarParametros(planta.parametros.monoxido).media,
        baja: this.conteos.monoxido.baja + this.contarParametros(planta.parametros.monoxido).baja
      };
      this.conteos.gases = {
        alta: this.conteos.gases.alta + this.contarParametros(planta.parametros.gases).alta,
        media: this.conteos.gases.media + this.contarParametros(planta.parametros.gases).media,
        baja: this.conteos.gases.baja + this.contarParametros(planta.parametros.gases).baja
      };
    });

    this.actualizarCards(this.breakpointObserver.isMatched([Breakpoints.Small, Breakpoints.XSmall])); 
  }

  private contarParametros(valor: number): { alta: number; media: number; baja: number } {
    const limites = { alta: 40, media: 20 };
    const resultado = { alta: 0, media: 0, baja: 0 };

    if (valor > limites.alta) {
      resultado.alta++;
    } else if (valor > limites.media && valor <= limites.alta) {
      resultado.media++;
    } else {
      resultado.baja++;
    }
    return resultado;
  }
}
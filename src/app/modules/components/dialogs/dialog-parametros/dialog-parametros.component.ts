import { Component, Inject } from '@angular/core';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-dialog-parametros',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-parametros.component.html',
  styleUrl: './dialog-parametros.component.scss'
})
export class DialogParametrosComponent {
  planta = this.data.data
  cards = [
    {parametro: 'Temperatura',valor: this.planta.parametros.temperatura , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.temperatura)},
    {parametro: 'Presion',valor: this.planta.parametros.presion , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.presion)},
    {parametro: 'Viento',valor: this.planta.parametros.viento , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.viento)},
    {parametro: 'Niveles',valor: this.planta.parametros.niveles , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.niveles)},
    {parametro: 'Energia',valor: this.planta.parametros.energia , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.energia)},
    {parametro: 'Tension',valor: this.planta.parametros.tension , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.tension)},
    {parametro: 'Monoxido de carbono',valor: this.planta.parametros.monoxido , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.monoxido)},
    {parametro: 'Otros gases',valor: this.planta.parametros.gases , cols: 1, rows: 1, color:this.calcularColor(this.planta.parametros.gases)},

  ];

  constructor(private dialog: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  calcularColor(valor:number){
    const limites = { alta: 40, media: 20 };
    if (valor > limites.alta) {
      return 'rgba(246, 150, 129, 0.5)';
    } else if (valor > limites.media && valor <= limites.alta) {
      return 'rgba(250, 218, 188, 0.5)';
    } else{
      return 'rgba(235, 248, 249, 0.5)';
    }
  }

  cerrar(){
    this.dialog.close(false);
  }
}

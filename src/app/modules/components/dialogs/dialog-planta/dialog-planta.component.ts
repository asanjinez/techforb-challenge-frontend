import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { PlantasService } from '../../../../core/services/plantas.service';
import { Planta } from '../../../../core/models/planta';
import { ResponseAlertManagerService } from '../../../../core/services/response-alert-manager.service';
import { Country } from '../../../../core/models/country';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-dialog-planta',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './dialog-planta.component.html',
  styleUrl: './dialog-planta.component.scss'
})

export class DialogPlantaComponent implements OnInit {
  errorMessage: string = '';
  plantaForm: FormGroup;
  editMode: boolean = false;
  countries: Country[] = [];
  filteredCountries!: Observable<Country[]>;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogPlantaComponent>,
    private plantasService: PlantasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private managerResponse: ResponseAlertManagerService
  ) {
    this.plantaForm = this.fb.group({
      id: ['',],
      pais: ['',],
      nombre: [''],
      numeroLecturas: [''],
      numeroAlertasMedias: [''],
      numeroAlertasRojas: [''],
      sensoresDeshabilitados: [''],
    });
    
  }

  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }
  
  ngOnInit(): void {
    this.editMode = this.data.editMode;
    this.applyValidators();
    
    if (this.editMode){
      this.plantaForm.patchValue(this.data.data);
      this.plantaForm.get('nombre')?.disable();
      this.plantaForm.get('pais')?.disable();
    } else {
      this.plantaForm.reset();
      this.plantaForm.get('nombre')?.enable();
      this.plantaForm.get('pais')?.enable();
      this.plantasService.getPaises().subscribe({
        next: (response) => {
          this.countries = response.data || [];
          this.filteredCountries = of(this.countries);
          this.filteredCountries = this.plantaForm.controls['pais'].valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        },
        error: (error) => {
          this.managerResponse.manageErrorResponseAlert(error);
        }
      });
    }

  }
  save(): void {
    console.log(this.plantaForm.value);
    
    if (this.plantaForm.valid) {
      let plantaSeleccionada:Planta = this.plantaForm.value;
      
      if (this.editMode) {
        plantaSeleccionada.id = this.data.data.id;
        plantaSeleccionada.nombre = this.data.data.nombre;
        plantaSeleccionada.pais = this.data.data.pais;

        this.plantasService.editPlanta(plantaSeleccionada).subscribe({
          next: (response) => {
            this.managerResponse.manageSuccessResponseAlert(response);
            this.dialogRef.close(response.data);
          },
          error: (error) => {
            this.managerResponse.manageErrorResponseAlert(error);
            this.dialogRef.close({}); 
          }
        });
      } else {
        this.plantasService.createPlanta(plantaSeleccionada).subscribe({
          next: (response) => {
            this.managerResponse.manageSuccessResponseAlert(response);
            this.dialogRef.close(response.data); // Cerramos el diálogo y pasamos los datos de la nueva planta
          },
          error: (error) => {
            this.managerResponse.manageErrorResponseAlert(error);
            this.dialogRef.close({}); 
          }
        });
      }
    } else {
      console.warn('El formulario no es válido');
    }
}

  updateErrorMessage(campo:string):void {
    if (this.plantaForm.controls[campo].hasError('required')) {
      this.errorMessage = 'Debes ingresar un ' + campo;
    } else {
      this.errorMessage = '';
    }
  }
  cancel():void{
    this.dialogRef.close();
  }

  applyValidators() {
    if (this.editMode) {
      this.plantaForm.get('numeroLecturas')?.setValidators(Validators.required);
      this.plantaForm.get('numeroAlertasMedias')?.setValidators(Validators.required);
      this.plantaForm.get('numeroAlertasRojas')?.setValidators(Validators.required);
      this.plantaForm.get('sensoresDeshabilitados')?.setValidators(Validators.required);

    } else {
      this.plantaForm.get('pais')?.clearValidators();
      this.plantaForm.get('nombre')?.clearValidators();
    }
    this.plantaForm.updateValueAndValidity();
  }

}

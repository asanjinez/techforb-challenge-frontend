import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-planta',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './dialog-planta.component.html',
  styleUrl: './dialog-planta.component.scss'
})
export class DialogPlantaComponent implements OnInit {
  plantaForm: FormGroup;
  editMode: boolean = false;
  elements: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogPlantaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.plantaForm = this.fb.group({
      id: [{value: '', disabled: this.editMode}],
      pais: [ { value: '', disabled: this.editMode }],
      nombre: [''],
      numeroLecturas: [''],
      numeroAlertasMedias: [''],
      numeroAlertasRojas: [''],
      sensoresDeshabilitados: [''],
    });
    
  }

  ngOnInit(): void {
    this.editMode = this.data.editMode;
    if (this.editMode){
      this.plantaForm.get('nombre')?.disable();
      this.plantaForm.get('pais')?.disable();
      this.plantaForm.patchValue(this.data.data);
    } else {
      this.plantaForm.reset();
      this.plantaForm.get('nombre')?.enable();
      this.plantaForm.get('pais')?.enable();
    }

    console.log(this.plantaForm);

  }
  save(): void {
    if (this.plantaForm.valid) {
      let formData = this.plantaForm.value;
      if (this.editMode) {
        // Lógica para el caso de edición
        formData.id = this.data.planta.id; // Incluye el ID para la actualización
      }
      this.dialogRef.close(formData); // Retorna los datos al componente que abrió el diálogo
    }
  }

  cancel():void{
    this.dialogRef.close();
  }

}

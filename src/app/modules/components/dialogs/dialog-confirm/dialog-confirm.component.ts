import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  constructor(private dialog: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(){
    this.dialog.close(false);
  }

  confirmar(){
    this.dialog.close(true);
  }
}

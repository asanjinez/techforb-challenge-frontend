import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { PlantasService } from '../../../../core/services/plantas.service';
import { Subject, takeUntil } from 'rxjs';
import { ResponseAlertManagerService } from '../../../../core/services/response-alert-manager.service';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dialog: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private plantasService: PlantasService, private responseAlertManager: ResponseAlertManagerService) { }

  cerrar(){
    this.dialog.close(false);
  }

  confirmar(){
      this.plantasService.deletePlanta(this.data.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.responseAlertManager.manageSuccessResponseAlert(response);
          this.dialog.close(true);
        },
        error: (error) => {
          this.responseAlertManager.manageErrorResponseAlert(error);
          this.dialog.close(false);
        }
    });
  }
}
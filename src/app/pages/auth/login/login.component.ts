import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { merge, Subject, takeUntil } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth/loginRequest';
import { ResponseAlertManagerService } from '../../../core/services/response-alert-manager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorMessage = '';
  hidePassword = true;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private authService: AuthService,
              private responseAlertManager: ResponseAlertManagerService
            ) {
    merge(this.loginForm.controls.email.valueChanges, this.loginForm.controls.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      this.errorMessage = 'Debes ingresar un email';
    } else if (this.loginForm.controls.email.hasError('email')) {
      this.errorMessage = 'Ingrese un formato de correo válido';
    } else {
      this.errorMessage = '';
    }
  }

  login(){
    if (this.loginForm.valid) {
      this.openDialog();
      this.authService.login(this.loginForm.value as LoginRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.responseAlertManager.manageSuccessResponseAlert(response);
        },
        error: (error) => {
          this.responseAlertManager.manageErrorResponseAlert(error);
        }
      }
      );
      this.resetForm();
      
    } else {
      alert("Error al ingresar los datos")
    }
    
  }

  openDialog() {
    // this.dialog.open();
  }
  resetForm() {
    this.loginForm.reset();
  }
}

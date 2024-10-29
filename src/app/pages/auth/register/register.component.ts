import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ResponseAlertManagerService } from '../../../core/services/response-alert-manager.service';
import { LoginRequest } from '../../../core/models/auth/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage: string = 'Este campo es obligatorio';
  emailEnUso: boolean = false;
  registroForm: FormGroup; 
  hidePassword: boolean = true;


  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private manageResponse: ResponseAlertManagerService,
    private router: Router,
  ) {
    this.registroForm = this.fb.group({
      id: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      avatar: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required,Validators.minLength(8)]],
    });
    this.registroForm.controls['id'].disable();
  }

  onEmailChange():void {
    let email:string = this.registroForm.controls['email'].value;
    if (email && this.registroForm.controls['email'].valid) {
      let loginRequest: LoginRequest = { email: email, password: '' };
      this.authService.validarEmail(loginRequest).subscribe({
        next: (response) => {
          if (!response.data) {
            this.emailEnUso = true;
            this.registroForm.controls['email'].setErrors({emailEnUso: this.emailEnUso});
          } else {
            this.emailEnUso = false;
            this.registroForm.controls['email'].setErrors(null);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  registrar(){
    if (this.registroForm.valid) {
      let usuario = this.registroForm.value;

      console.log(usuario);
      this.authService.register(usuario).subscribe({
        
        next: (response) => {
          this.manageResponse.manageSuccessResponseAlert(response);
          this.router.navigate(['/login']);
          this.registroForm.reset();
        },
        error: (error) => {
          this.manageResponse.manageErrorResponseAlert(error);
          
          
        }
      });
    }
  }

  navLogin(){
    this.router.navigate(['/auth/login']);
  }

}

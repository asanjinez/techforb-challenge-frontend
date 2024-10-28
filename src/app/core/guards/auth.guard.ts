import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService)
  let toastr: any = inject(ToastrService)

  let isAuth = false
  isAuth = authService.estaLogueado();
  if (isAuth) {
    // alert("Atencion, esto dio true")
    
    return true;

  }
  // alert("Atencion, esto dio false, despues de esto procede a desloguear ")
  console.log('Usuario no logueado');
  toastr.error('No tienes permisos para acceder a esta página', 'Acceso denegado');
  authService.logout();

  return isAuth;
};

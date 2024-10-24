import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  let toastr: any = inject(ToastrService);

  if (!authService.estaLogueado())
    return true;

  router.navigate(['/dashboard']);
  toastr.error('Ya estás logueado', 'Puedes acceder al dashboard');
  return false
}

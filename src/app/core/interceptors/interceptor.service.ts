import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("se hizo una peticion http");
    return next.handle(req).pipe(
      catchError(this.handleError)
    );
  }


  handleError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      console.error('Usuario no autorizado');
    } else if (error.status === 403) {
      console.error('Acceso prohibido. Verifica tus permisos.');
    } else if (error.status >= 500 && error.status < 600) {
      console.error('Error del servidor. Por favor, inténtalo de nuevo más tarde.');
    }
    
    const errorMessage = error.error instanceof ErrorEvent ? error.error.error : 'Error en la solicitud HTTP';
    console.error(errorMessage);
    console.log("asdasd");
    
    // Retornar un observable que contenga el error original sin modificar
    return throwError(error);
  }
}

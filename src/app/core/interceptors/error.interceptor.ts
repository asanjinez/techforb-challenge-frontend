import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

// @Injectable({
//     providedIn: 'root'
//   })
//   export class ErrorInterceptor implements HttpInterceptor {
//     constructor(private router:Router) {  }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req).pipe(
//             catchError((error) => {
//                 console.log("Error en la peticion http");
//                 if ([401,403,404].indexOf(error.status) !== -1) {
//                     this.router.navigate(['/login']);
//                     console.error('Error de autenticacion');
//                 } 
//                 return throwError(error);
//             }
//         )
//     }
  
// }
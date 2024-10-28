import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


export const AuthInterceptor: HttpInterceptorFn = (req,next) =>{
    let cookiesService: CookieService = inject(CookieService);
    let token = cookiesService.get('token');

    if (token) {
        let modifiedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
        return next(modifiedReq);
    }
    
    // Si no hay token, manda la petición sin modificar
    return next(req);
};
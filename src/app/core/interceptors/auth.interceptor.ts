import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';


export const AuthInterceptor: HttpInterceptorFn = (req,next) =>{
    let token = localStorage.getItem('token');

    if (token) {
        let modifiedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
        return next(modifiedReq);
    }
    
    // Si no hay token, manda la petición sin modificar
    return next(req);
};
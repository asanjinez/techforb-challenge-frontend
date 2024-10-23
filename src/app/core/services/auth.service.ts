import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/loginRequest';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { LoginResponse } from '../models/auth/loginResponse';
import { RegisterRequest } from '../models/auth/registerRequest';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService) { }
  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>('http://localhost:8080/api/auth/login', loginRequest).pipe(
      tap (response => {
        if (response.data?.token && response.data?.usuario)
        this.storageService.guardarSession(response.data.token, response.data.usuario);
      })
    );
  }

  register(RegisterRequest: RegisterRequest): Observable<ApiResponse<String>> {
    return this.http.post<ApiResponse<String>>('http://localhost:8080/api/auth/register', RegisterRequest);
  }

}

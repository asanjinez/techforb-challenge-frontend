import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/loginRequest';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { LoginResponse } from '../models/auth/loginResponse';
import { RegisterRequest } from '../models/auth/registerRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>('http://localhost:8080/api/auth/login', loginRequest);
  }

  register(RegisterRequest: RegisterRequest): Observable<ApiResponse<String>> {
    return this.http.post<ApiResponse<String>>('http://localhost:8080/api/auth/register', RegisterRequest);
  }

}

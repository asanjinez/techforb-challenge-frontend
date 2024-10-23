import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {  }
  findUserById(id: number) {
    return this.http.get(`http://localhost:8080/api/usuarios/${id}`);
  }
  
}

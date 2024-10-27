import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/apiResponse";
import { Planta } from "../models/planta";
import { Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PlantasService{
    constructor(private http: HttpClient) { }

    getPlantas(): Observable<ApiResponse<Planta[]>> {
      const plantasPrueba: Planta[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        nombre: `Planta ${i + 1}`,
        pais: i % 3 === 0 ? 'Argentina' : i % 3 === 1 ? 'Chile' : 'Uruguay',
        numeroLecturas: Math.floor(Math.random() * 500) + 100, 
        numeroAlertasMedias: Math.floor(Math.random() * 30), 
        numeroAlertasRojas: Math.floor(Math.random() * 15), 
        sensoresDeshabilitados: Math.floor(Math.random() * 10),
      }));

      const response: ApiResponse<Planta[]> = {
        data: plantasPrueba,
        success: true,
        message: 'Datos de prueba devueltos correctamente.'
      };
  
      return of(response); 
        // return this.http.get<ApiResponse<Planta[]>>('http://localhost:8080/api/plantas');
    }
    
  }
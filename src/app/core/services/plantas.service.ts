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
        return this.http.get<ApiResponse<Planta[]>>('http://localhost:8080/api/plantas');
    }

    deletePlanta(id: number): Observable<ApiResponse<Planta>> {
        return this.http.delete<ApiResponse<Planta>>(`http://localhost:8080/api/plantas/delete/${id}`);
    }

    createPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
        return this.http.post<ApiResponse<Planta>>('http://localhost:8080/api/plantas', planta);
    }

    editPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
        return this.http.put<ApiResponse<Planta>>(`http://localhost:8080/api/plantas/edit/${planta.id}`, planta);
    }
    
  }
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/apiResponse";
import { Planta } from "../models/planta";
import { Observable, of, tap } from "rxjs";
import { enviroment } from "../../../enviroments";

@Injectable({
    providedIn: 'root'
  })
  export class PlantasService{
    private baseUrl = enviroment.baseApiUrl + '/plantas';
    constructor(private http: HttpClient) { }

    getPlantas(): Observable<ApiResponse<Planta[]>> {
        return this.http.get<ApiResponse<Planta[]>>(this.baseUrl);
    }

    deletePlanta(id: number): Observable<ApiResponse<Planta>> {
        return this.http.delete<ApiResponse<Planta>>(this.baseUrl + `/delete/${id}`);
    }

    createPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
        return this.http.post<ApiResponse<Planta>>(this.baseUrl, planta);
    }

    editPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
        return this.http.put<ApiResponse<Planta>>(this.baseUrl + `/edit/${planta.id}`, planta);
    }
    
  }
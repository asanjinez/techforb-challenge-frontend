import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/apiResponse";
import { Planta } from "../models/planta";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PlantasService{
    constructor(private http: HttpClient) { }

    getPlantas(): Observable<ApiResponse<Planta[]>> {
        return this.http.get<ApiResponse<Planta[]>>('http://localhost:8080/api/plantas');
    }
    
  }
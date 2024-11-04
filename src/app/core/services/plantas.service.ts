import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/apiResponse";
import { Planta } from "../models/planta";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { enviroment } from "../../../enviroments";
import { Country } from "../models/country";

@Injectable({
    providedIn: 'root'
  })
  export class PlantasService{
    private countriesUrl = enviroment.baseApiUrl + '/countries';
    private baseUrl = enviroment.baseApiUrl + '/plantas';
    constructor(private http: HttpClient) { }

    private listaSubject = new BehaviorSubject<Planta[]>([]);
    public lista$: Observable<Planta[]> = this.listaSubject.asObservable();

    loadPlantas(): void {
        this.http.get<ApiResponse<Planta[]>>(this.baseUrl)
          .pipe(
            tap(response => {
              if (response && response.data) {
                this.listaSubject.next(response.data);
              }
            })
          )
          .subscribe();
      }
    

    deletePlanta(id: number): Observable<ApiResponse<Planta>> {
    return this.http.delete<ApiResponse<Planta>>(this.baseUrl + `/delete/${id}`)
        .pipe(
            tap(() => {
                const listaActualizada = this.listaSubject.getValue().filter(item => item.id !== id);
                this.listaSubject.next(listaActualizada);
            })
        );
    }

    createPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
        let randomParametros = {
            temperatura: Math.random() * (100 - 1) + 1,
            presion: Math.random() * (100 - 1) + 1,
            viento: Math.random() * (100 - 1) + 1,
            niveles: Math.random() * (100 - 1) + 1,
            energia: Math.random() * (100 - 1) + 1,
            tension: Math.random() * (100 - 1) + 1,
            monoxido: Math.random() * (100 - 1) + 1,
            gases: Math.random() * (100 - 1) + 1,
        }
        planta.parametros = randomParametros;
        return this.http.post<ApiResponse<Planta>>(this.baseUrl, planta)
          .pipe(
            tap(response => {
              if (response && response.data) {
                const listaActualizada = [...this.listaSubject.getValue(), response.data];
                this.listaSubject.next(listaActualizada);
              }
            })
          );
      }


    editPlanta(planta: Planta): Observable<ApiResponse<Planta>> {
    return this.http.put<ApiResponse<Planta>>(this.baseUrl + `/edit/${planta.id}`, planta)
        .pipe(
            tap(response => {
                if (response && response.data) {
                    const listaActual = this.listaSubject.getValue();
                    const index = listaActual.findIndex(item => item.id === planta.id);
                    if (index !== -1) {
                        listaActual[index] = response.data;
                        this.listaSubject.next([...listaActual]);
                    }
                }
            })
        );
    }

    getPaises(): Observable<ApiResponse<Country[]>> {
        return this.http.get<ApiResponse<Country[]>>(this.countriesUrl);
    }
  }
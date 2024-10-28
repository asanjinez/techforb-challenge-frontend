import { Parametros } from "./parametros";

export interface Planta {
    id: number;
    nombre: string;
    pais: string;
    numeroLecturas: number;
    numeroAlertasMedias: number;
    numeroAlertasRojas: number;
    sensoresDeshabilitados: number;
    parametros: Parametros;
}
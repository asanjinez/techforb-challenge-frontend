import { Country } from "./country";
import { Parametros } from "./parametros";

export interface Planta {
    id: number;
    nombre: string;
    pais: Country;
    numeroLecturas: number;
    numeroAlertasMedias: number;
    numeroAlertasRojas: number;
    sensoresDeshabilitados: number;
    parametros: Parametros;
}
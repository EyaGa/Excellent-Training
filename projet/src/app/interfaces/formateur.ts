import { Employeur } from "./employeur";

export interface Formateur {
    idFormateur?: number;
    nomFormateur: string;
    prenomFormateur: string;
    emailFormateur: string;
    telFormateur: number;
    typeFormateur: string;
    employeur: Employeur;
}

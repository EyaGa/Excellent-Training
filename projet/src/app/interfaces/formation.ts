import { Domaine } from "./domaine";

export interface Formation {
    idFormation?: number;
    titre: string;
    annee: string;
    duree: string;
    budget: number;
    domaine: Domaine;
}

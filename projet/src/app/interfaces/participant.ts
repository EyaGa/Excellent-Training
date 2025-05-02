import { Formation } from "./formation";
import { Profil } from "./profil";
import { Structure } from "./structure";

export interface Participant {
    idParticipant?: number;
    nomParticipant: string;
    prenomParticipant: string;
    emailParticipant: string;
    telParticipant: number;
    structure: Structure;
    profil: Profil;
    formations?: Formation[];
}

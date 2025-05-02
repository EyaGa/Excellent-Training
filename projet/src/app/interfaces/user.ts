import { booleanAttribute } from "@angular/core";
import { Role } from "./role";

export interface User {
    idUser?: number;
    login: string;
    mdp: string;
    verificationCode?: string;
    enabled?: boolean;
    createdAt?: Date; // ou LocalDateTime => Date ici
    verificationCodeExpiry?: Date;
    role: Role;

}


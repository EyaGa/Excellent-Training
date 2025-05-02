import { Role } from "./role";


export interface LoginResponse {
    status: 'SUCCESS' | 'FAILURE';
    message: string;
    accessToken: string;
    userRole: Role;
}

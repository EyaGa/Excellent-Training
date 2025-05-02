import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { UserDto } from 'src/app/interfaces/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training/user';

  constructor(private http: HttpClient) { }

  addUtilisateur(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/utilisateur`, user);
  }

  addResponsable(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/responsable`, user);
  }

  addAdministrateur(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/administrateur`, user);
  }

  getClients(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/utilisateurs`);
  }

  getResponsables(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/responsables`);
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/allusers`);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/byId/${id}`);
  }

  getUserByLogin(login: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/byLogin/${login}`);
  }
  getUserRole(login: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/role?login=${login}`);
  }

  verifyUser(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify?code=${code}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

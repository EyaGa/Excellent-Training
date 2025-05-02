import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training/role';

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/allroles`);
  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/register`, role);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employeur } from 'src/app/interfaces/employeur';

@Injectable({
  providedIn: 'root'
})
export class EmployeurSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training/employeur';

  constructor(private http: HttpClient) { }

  getAllEmployeurs(): Observable<Employeur[]> {
    return this.http.get<Employeur[]>(`${this.baseUrl}/all`);
  }

  addEmployeur(employeur: Employeur): Observable<Employeur> {
    return this.http.post<Employeur>(`${this.baseUrl}/register`, employeur);
  }

  updateEmployeur(employeur: Employeur): Observable<Employeur> {
    return this.http.put<Employeur>(`${this.baseUrl}`, employeur);
  }

  deleteEmployeur(idEmployeur: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idEmployeur}`);
  }
}

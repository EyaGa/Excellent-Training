import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from 'src/app/interfaces/formateur';

@Injectable({
  providedIn: 'root'
})
export class FormateurSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training/formateur';

  constructor(private http: HttpClient) { }

  getAllFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(`${this.baseUrl}/all`);
  }

  addFormateur(formateur: Formateur): Observable<Formateur> {
    return this.http.post<Formateur>(`${this.baseUrl}/register`, formateur);
  }

  updateFormateur(formateur: Formateur): Observable<Formateur> {
    return this.http.put<Formateur>(`${this.baseUrl}`, formateur);
  }

  deleteFormateur(idFormateur: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idFormateur}`);
  }
}

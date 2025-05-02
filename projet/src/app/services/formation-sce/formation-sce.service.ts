import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationSceService {
  private baseUrl = 'http://192.168.1.17:8080/excellent-training/formation';

  constructor(private http: HttpClient) { }

// services/participant-sce/participant-sce.service.ts

  getFormationsByParticipant(idParticipant: number): Observable<Formation[]> {
  return this.http.get<Formation[]>(`${this.baseUrl}/all/${idParticipant}`);
  }


  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/all`);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.baseUrl}/register`, formation);
  }

  updateFormation(formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.baseUrl}`, formation);
  }

  deleteFormation(idFormation: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idFormation}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training'; // Ajustez selon votre backend

  constructor(private http: HttpClient) {}

  getFormateursParType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/formateur/formateurs-par-type`);
  }

  getParticipantsParStructure(): Observable<any> {
    return this.http.get(`${this.baseUrl}/participant/participants-par-structure`);
  }

  getParticipantsParProfil(): Observable<any> {
    return this.http.get(`${this.baseUrl}/participant/participants-par-profil`);
  }

  getFormationsParDomaine(): Observable<any> {
    return this.http.get(`${this.baseUrl}/formation/formations-par-domaine`);
  }

  getFormationsParAnnee(): Observable<any> {
    return this.http.get(`${this.baseUrl}/formation/formations-par-annee`);
  }

}

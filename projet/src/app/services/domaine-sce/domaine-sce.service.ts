import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domaine } from 'src/app/interfaces/domaine';

@Injectable({
  providedIn: 'root'
})
export class DomaineSceService {
  private baseUrl = 'http://192.168.1.17:8080/excellent-training/domaine';

  constructor(private http: HttpClient) { }

  getAllDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(`${this.baseUrl}/all`, { responseType: 'json' });
  }

  addDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(`${this.baseUrl}/register`, domaine);
  }

  updateDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.put<Domaine>(`${this.baseUrl}`, domaine);
  }

  deleteDomaine(idDomaine: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idDomaine}`);
  }

}

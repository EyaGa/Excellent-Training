import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from 'src/app/interfaces/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilSceService {
  private baseUrl = 'http://192.168.1.17:8080/excellent-training/profil';

  constructor(private http: HttpClient) { }

  getAllProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.baseUrl}/all`);
  }

  addProfil(profil: Profil): Observable<Profil> {
    return this.http.post<Profil>(`${this.baseUrl}/register`, profil);
  }

  updateProfil(profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.baseUrl}`, profil);
  }

  deleteProfil(idProfil: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idProfil}`);
  }
}

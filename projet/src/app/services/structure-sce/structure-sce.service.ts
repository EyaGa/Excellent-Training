import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure } from 'src/app/interfaces/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureSceService {

  
  private baseUrl = 'http://192.168.1.17:8080/excellent-training/structure';

  constructor(private http: HttpClient) { }

  getAllStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(`${this.baseUrl}/all`);
  }

  addStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(`${this.baseUrl}/register`, structure);
  }

  updateStructure(structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(`${this.baseUrl}`, structure);
  }

  deleteStructure(idStructure: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idStructure}`);
  }
}

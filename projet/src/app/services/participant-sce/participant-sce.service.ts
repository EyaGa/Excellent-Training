import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/interfaces/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantSceService {

  private baseUrl = 'http://192.168.1.17:8080/excellent-training/participant';

  constructor(private http: HttpClient) { }

  getAllParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.baseUrl}/all`);
  }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(`${this.baseUrl}/register`, participant);
  }

  updateParticipant(participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.baseUrl}`, participant);
  }

  deleteParticipant(idParticipant: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idParticipant}`);
  }
}

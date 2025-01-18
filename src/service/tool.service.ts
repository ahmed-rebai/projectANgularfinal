import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Outil } from 'src/model/outil';
import { tools } from 'src/model/tools';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = 'http://localhost:9000/outils';

  constructor(private http: HttpClient) {}

  getOutils(): Observable<Outil[]> {
    return this.http.get<Outil[]>(this.baseUrl);
  }

  getOutilById(id: number): Observable<Outil> {
    return this.http.get<Outil>(`${this.baseUrl}/${id}`);
  }

  addOutil(outil: Outil): Observable<Outil> {
    return this.http.post<Outil>(this.baseUrl, outil);
  }

  deleteOutil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateOutil(id: number, outil: Outil): Observable<Outil> {
    // Utilisez la méthode PUT pour envoyer la requête de mise à jour.
    return this.http.put<Outil>(`${this.baseUrl}/${id}`, outil);
  }

  outilMemberLink(idMember: number, outil: Outil): Observable<Outil[]> {
    return this.http.post<Outil[]>(`http://localhost:9000/membres/${idMember}/outils`, outil);
  }

}

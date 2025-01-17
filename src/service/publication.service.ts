import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/model/Publication';
import { PublicationDTO } from 'src/model/PublicationDTO';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiUrl = 'http://localhost:9000/publications';  // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }


  createPublication(publication: PublicationDTO): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, publication);
  }

  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}/${id}`, publication);
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
    // Récupérer les publications d'un membre
    getPublicationsByMemberId(memberId: number): Observable<Publication[]> {
      return this.http.get<Publication[]>(`${this.apiUrl}/${memberId}/publications`);
    }
  
    // Créer une publication pour un membre
    createPublicationForMember(memberId: number, publication: PublicationDTO): Observable<Publication[]> {
      return this.http.post<Publication[]>(`${this.apiUrl}/${memberId}/publications`, publication);
    }
  
    // Mettre à jour une publication pour un membre
    updatePublicationForMember(memberId: number, publicationId: number, publication: Publication): Observable<Publication[]> {
      return this.http.put<Publication[]>(`${this.apiUrl}/${memberId}/publications/${publicationId}`, publication);
    }
  
    // Supprimer une publication pour un membre
    deletePublicationForMember(memberId: number, publicationId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${memberId}/publications/${publicationId}`);
    }
}

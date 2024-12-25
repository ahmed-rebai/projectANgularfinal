import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { articles } from 'src/model/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

   constructor(private http:HttpClient) { }
    getAllarticles():Observable<articles[]>
    {
      //envoyer une requette en mode http
      return this.http.get<articles[]>('http://localhost:3000/articles');
    }
    getarticles(id: String):Observable<articles>
    {
      //envoyer une requette en mode http
      return this.http.get<articles>(`http://localhost:3000/articles/${id}`);
    }
    Createarticles(articlestoSave : articles):Observable <void>{
      return this.http.post<void>("http://localhost:3000/articles",articlestoSave);
  
    }
    Deletearticles(id: String): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/articles/${id}`);
    }
    editarticles(articlestoSave : articles,id: String): Observable<void> {
      return this.http.put<void>(`http://localhost:3000/articles/${id}`,articlestoSave)
    }
}

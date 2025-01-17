import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/model/evt';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http:HttpClient) { }

  getAllEvent():Observable<Evt[]>
  {
    return this.http.get<Evt[]>('http://localhost:9000/evenements')
  }
  addEvent(event: Event):Observable<Evt>
  {
    return this.http.post<Evt>('http://localhost:9000/evenements',event)
  }
  getEventById( id: String):Observable<Evt>{
    return this.http.get<Evt>(`http://localhost:9000/evenements/${id}`)
  }
  update(event: Evt, id: string): Observable<void> {
    return this.http.put<void>(`http://localhost:9000/evenements/${id}`, event);
  }
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:9000/evenements/${id}`);
  }
}
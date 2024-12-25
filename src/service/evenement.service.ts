import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { evt } from 'src/model/evt';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http:HttpClient) { }

  getAllevents(): Observable<evt[] >

  {
    // envoie la requette htpp en mode get
    return this.http.get<evt[]>('http://localhost:3000/evt')
  }

  addEvent(evt :evt): Observable <void>{
 return this.http.post<void>('http://localhost:3000/evt',evt)
  }
  delete(id:string): Observable<void>
  {
    return this.http.delete<void>(`http://localhost:3000/evt/${id}`)
  }

  getEventID(id:string): Observable<evt >

    {
      return this.http.get<evt>(`http://localhost:3000/evt/${id}`)
    }


    update(x:evt,id:string):Observable<void>{
      return this.http.put<void>(`http://localhost:3000/evt/${id}`,x)
    }
  




}

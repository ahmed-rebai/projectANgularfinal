import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tools } from 'src/model/tools';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private http:HttpClient) { }
  getAlltools():Observable<tools[]>
  {
    //envoyer une requette en mode http
    return this.http.get<tools[]>('http://localhost:3000/tools');
  }
  gettools(id: String):Observable<tools>
  {
    //envoyer une requette en mode http
    return this.http.get<tools>(`http://localhost:3000/tools/${id}`);
  }
  Createtools(toolstoSave : tools):Observable <void>{
    return this.http.post<void>("http://localhost:3000/tools",toolstoSave);

  }
  Deletetools(id: String): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/tools/${id}`);
  }
  edittools(toolstoSave : tools,id: String): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/tools/${id}`,toolstoSave)
  }
}

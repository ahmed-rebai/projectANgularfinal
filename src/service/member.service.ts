import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { member } from 'src/model/member';
// decorateur permet d'injecter ce service dans autres services ou autres composants
// providedIn: 'root'  c'est a dire le service est injecté sur toute la root 
@Injectable({
  providedIn: 'root'
})
export class MemberService {
// n7touu des fonctions qui representent des cruds sur le member
//il faut ajouter les biblitotheques eli ygeneriwh http request
// service tkharej requette http  type de retour houwa observable 5atr angular lance un thread de type observable 

  constructor(private http:HttpClient) { }
  getAllMembers(): Observable<member[] >

  {
    // envoie la requette htpp en mode get
    return this.http.get<member[]>('http://localhost:3000/members')
  }

  // type de retour dima observable khatr requette 
  add(x:member): Observable<void>
  {
  return this.http.post<void>('http://localhost:3000/members',x)

  }
  delete(id:string): Observable<void>
  {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`)
  }
  getMemberById(id:string):Observable<member>
  {
    return this.http.get<member>(`http://localhost:3000/members/${id}`)
  }
  updateMember(x:member,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/members/${id}`,x)
  }
 
}

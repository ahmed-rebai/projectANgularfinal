import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnseignantChercheur } from 'src/model/EnseignantChercheur';
import { Etudiant } from 'src/model/Etudiant';
import { member } from 'src/model/member';
// decorateur permet d'injecter ce service dans autres services ou autres composants
// providedIn: 'root'  c'est a dire le service est injecté sur toute la root 
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  getAllMembers(): Observable<member[] >

  {
    
    return this.http.get<member[]>('http://localhost:9000/membres')
  }


  getAllStudents():Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>('http://localhost:9000/membres/etudiants')
  }

  getAllTeachers():Observable<EnseignantChercheur[]>{
    return this.http.get<EnseignantChercheur[]>('http://localhost:9000/membres/teachers')
  }

  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>('http://localhost:9000/membres/etudiant', etudiant);
  }

  // Ajouter un enseignant-chercheur
  addEnseignant(enseignant: EnseignantChercheur): Observable<EnseignantChercheur> {
    return this.http.post<EnseignantChercheur>('http://localhost:9000/membres/enseignant', enseignant);
  }


  updateEnseignant(id:string,x:EnseignantChercheur):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/membres/enseignant/${id}`,x)
  }


  updateEtudiant(id:string,x:Etudiant):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/membres/etudiant/${id}`,x)
  }
  
  delete(id:string): Observable<void>
  {
    return this.http.delete<void>(`http://localhost:9000/membres/${id}`)
  }
  getMemberById(id:string):Observable<member>
  {
    return this.http.get<member>(`http://localhost:9000/membres/${id}`)
  }
  updateMember(x:member,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/members/${id}`,x)
  }
 
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberService } from 'src/service/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Etudiant } from 'src/model/Etudiant';
import { EnseignantChercheur } from 'src/model/EnseignantChercheur';
import { member } from 'src/model/member';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  dataSource: member[] = [];
  dataEtudiant: Etudiant[] = [];
  dataEnseignant: EnseignantChercheur[] = [];

  constructor(private ms: MemberService, private dialog: MatDialog, private router: Router) {}

  displayedColumns: string[] = ['cin', 'nom', 'prenom', 'dateNaissance', 'cv', 'email','Encadrant', 'diplome','image', 'delete', 'edit'];
  displayedColumnsEnseignants: string[] = ['cin', 'nom', 'prenom', 'dateNaissance', 'cv', 'email', 'grade', 'etablissement','image', 'delete', 'edit'];
  ngOnInit(): void {
    
    this.getEtudiants();
    this.GetEnseignant();
  }

  getEtudiants(): void {
    this.ms.getAllStudents().subscribe((response) => {
      this.dataEtudiant = response;
    });
  }

  GetEnseignant(): void {
    this.ms.getAllTeachers().subscribe((resultat) => {
      this.dataEnseignant = resultat;
      console.log(resultat);
    });
  }
  delete(id: string): void {
    console.log(id);
  
    // Lancer la boîte de dialogue de confirmation
    const dialogRef = this.dialog.open(ConfirmComponent);
  
    dialogRef.afterClosed().subscribe((response) => {
      if (response) { // Si la suppression est confirmée
        this.ms.delete(id).subscribe(
          () => {
            console.log(`Membre avec l'id ${id} supprimé.`);
            // Rafraîchir les listes après suppression
            this.getEtudiants();
            this.GetEnseignant();
          },
          (error) => {
            console.error('Erreur lors de la suppression : ', error);
          }
        );
      }
    });
  }

  onEdit(element: any) {
    if (element.isEtudiant) {
      // Redirige vers la page formetd pour les étudiants
      this.router.navigate([`/create-etudiant/${element.id}`]);
    } else {
      // Redirige vers la page member-form pour les enseignants
      this.router.navigate([`/create/${element.id}`]);
    }
  }
  
}

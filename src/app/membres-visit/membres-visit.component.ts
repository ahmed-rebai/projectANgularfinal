import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from 'src/service/member.service';

@Component({
  selector: 'app-membres-visit',
  templateUrl: './membres-visit.component.html',
  styleUrls: ['./membres-visit.component.css']
})
export class MembresVisitComponent implements OnInit {
  displayedColumns: string[] = [ 'nom','prenom', 'email','type','publication','outils','evenement','grade','etablissement']; // Colonnes à afficher
  dataSource = new MatTableDataSource<any>(); // Source de données pour la table

  constructor(private membersService: MemberService) {}

  ngOnInit(): void {
    this.membersService.getAllMembers().subscribe({
      next: (members) => {
        this.dataSource.data = members; // Remplir les données de la table
      },
      error: (err) => console.error('Erreur lors du chargement des membres :', err),
    });
  }

  // Appliquer un filtre sur la table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Normalisation du texte
  }
}

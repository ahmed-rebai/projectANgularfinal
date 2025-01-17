import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/model/Publication';
import { PublicationDTO } from 'src/model/PublicationDTO';
import { PublicationService } from 'src/service/publication.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  publicationForm: Publication = new Publication(0, '', '', '', new Date(), '');
  today: string = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  isEditMode: boolean = false; // Indique si le formulaire est en mode édition
  editingId: number | null = null; // Stocke l'ID de la publication en cours d'édition

  constructor(private publicationService: PublicationService, private router: Router) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.publicationService.getPublications().subscribe(
      (data: Publication[]) => {
        this.publications = data;
      },
      (error) => {
        console.error('Error loading publications', error);
      }
    );
  }

  onCreateOrUpdate(): void {
    if (this.isEditMode && this.editingId !== null) {
      // Mode édition
      this.publicationService.updatePublication(this.editingId, this.publicationForm).subscribe(
        (updatedPublication: Publication) => {
          const index = this.publications.findIndex(pub => pub.id === this.editingId);
          if (index !== -1) {
            this.publications[index] = updatedPublication;
          }
          this.resetForm();
        },
        (error) => {
          console.error('Error updating publication', error);
        }
      );
    } else {
      // Mode création
      const publicationDTO: PublicationDTO = {
        type: this.publicationForm.type,
        titre: this.publicationForm.titre,
        lien: this.publicationForm.lien,
        date: this.publicationForm.date,
        sourcepdf: this.publicationForm.sourcepdf
      };

      this.publicationService.createPublication(publicationDTO).subscribe(

        (newPublication: Publication) => {
          
          this.publications.push(newPublication);
          this.resetForm();
        },
        (error) => {
          console.error('Error creating publication', error);
        }
      );
    }
  }

  onDelete(id: number): void {
    this.publicationService.deletePublication(id).subscribe(
      () => {
        this.publications = this.publications.filter(pub => pub.id !== id);
      },
      (error) => {
        console.error('Error deleting publication', error);
      }
    );
  }

  onEdit(id: number): void {
    this.isEditMode = true;
    this.editingId = id;
    const publication = this.publications.find(pub => pub.id === id);
    if (publication) {
      this.publicationForm = { ...publication };
    }
  }

  resetForm(): void {
    this.publicationForm = new Publication(0, '', '', '', new Date(), '');
    this.isEditMode = false;
    this.editingId = null;
  }
}
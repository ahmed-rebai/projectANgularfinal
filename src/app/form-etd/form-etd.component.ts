import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantChercheur } from 'src/model/EnseignantChercheur';
import { MemberService } from 'src/service/member.service';

@Component({
  selector: 'app-form-etd',
  templateUrl: './form-etd.component.html',
  styleUrls: ['./form-etd.component.css']
})
export class FormEtdComponent implements OnInit {
  formEtd!: FormGroup;
  selectedFileName: string = '';
  encadrants: EnseignantChercheur[] = [];
  today = new Date();
  currentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ms: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initForm();  // Appeler initForm() dans ngOnInit

    // Si un ID est fourni (mode édition), récupérer les données et pré-remplir le formulaire
    if (this.currentId) {
      this.ms.getMemberById(this.currentId).subscribe((member) => {
        console.log(member);
        this.formEtd.patchValue(member);  // Pré-remplir le formulaire avec les données de l'étudiant
      });
    }

    // Récupérer les encadrants uniquement une fois le composant initialisé
    this.ms.getAllTeachers().subscribe((data) => {
      this.encadrants = data;
    });
  }

  initForm(): void {
    this.formEtd = this.fb.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      cv: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateInscription: [this.today, Validators.required],
      sujet: ['', Validators.required],
      diplome: ['', Validators.required],
      encadrant: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name; // Afficher le nom du fichier
      this.formEtd.patchValue({
        cv: file.name // Enregistrer le nom du fichier dans le champ 'cv'
      });
    }
  }

  onSubmit(): void {
    if (this.formEtd.valid) {
      console.log(this.formEtd.value);
      const etudiant = { ...this.formEtd.value, type: 'etd' };

      if (this.currentId) {
        // Si c'est un mode édition, mettre à jour les informations
        this.ms.updateEtudiant( this.currentId,etudiant).subscribe(() => {
          this.router.navigate(['/member']);
        });
      } else {
        // Sinon, ajouter un nouvel étudiant
        this.ms.addEtudiant(etudiant).subscribe(() => {
          this.router.navigate(['/member']);
        });
      }
    }
  }
}

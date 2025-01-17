import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/service/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  selectedFileName: string = '';
  currentId: string | null = null; // ID courant pour déterminer si create ou edit

  constructor(
    private ms: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.currentId);
    this.initForm();

    if (this.currentId) {
     
      this.ms.getMemberById(this.currentId).subscribe((member) => {
        console.log(member);
        this.form.patchValue(member); 
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null),
      email: new FormControl(null, [Validators.required]),
      grade: new FormControl(null, [Validators.required]),
      etablissement: new FormControl(null, [Validators.required]),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name; // Afficher le nom du fichier
      this.form.patchValue({
        cv: file.name // Enregistrer le nom du fichier dans le champ 'cv'
      });
    }
  }

  sub(): void {
    const formData = {
      ...this.form.value,
    };

    if (this.currentId) {
      // Appeler l'API de mise à jour si en mode édition
      this.ms.updateEnseignant(this.currentId, formData).subscribe(() => {
        this.router.navigate(['/member']);
      });
    } else {
      
      this.ms.addEnseignant(formData).subscribe(() => {
        this.router.navigate(['/member']);
      });
    }
  }
}

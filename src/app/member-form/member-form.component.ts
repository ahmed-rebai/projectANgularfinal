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
  selectedFileName: string = ''; // For displaying the selected file name
  selectedPhotoFileName: string = ''; // For displaying the selected photo name

  constructor(
    private ms: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!idcourant) {
      this.ms.getMemberById(idcourant).subscribe((member) => {
        this.form = new FormGroup({
          cin: new FormControl(member.cin, [Validators.required]),
          name: new FormControl(member.name, [Validators.required]),
          prenom: new FormControl(member.prenom, [Validators.required]),
          date: new FormControl(member.date, [Validators.required]),
          photo: new FormControl(member.photo),
          cv: new FormControl(member.cv, [Validators.required]),
          email: new FormControl(member.email, [Validators.required, Validators.email]),
          password: new FormControl(member.password, [Validators.required, Validators.minLength(6)]),
          type: new FormControl(member.type, [Validators.required])
        });
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      photo: new FormControl(null),
      cv: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      type: new FormControl(null, [Validators.required])
    });
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (field === 'cv') {
        this.selectedFileName = file.name;
        this.form.patchValue({ cv: file.name });
      } else if (field === 'photo') {
        this.selectedPhotoFileName = file.name;
        this.form.patchValue({ photo: file.name });
      }
    }
  }

  sub(): void {
    const idcourant = this.activatedRoute.snapshot.params['id'];
    const formData = {
      ...this.form.value,
      createdDate: new Date().toISOString()
    };

    if (!!idcourant) {
      this.ms.updateMember(formData, idcourant).subscribe(() => {
        this.router.navigate(['/member']);
      });
    } else {
      this.ms.add(formData).subscribe(() => {
        this.router.navigate(['/member']);
      });
    }
  }
}

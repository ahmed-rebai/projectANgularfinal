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
          cv: new FormControl(member.cv, [Validators.required]),
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
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    });
  }

  // File selection handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name; // Display the file name
      this.form.patchValue({
        cv: file.name // Save the file name in the 'cv' field
      });
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

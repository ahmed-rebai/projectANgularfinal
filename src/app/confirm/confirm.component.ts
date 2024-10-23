import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  // on impose que ce model soit une boite de dialogue
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>) {
}


}
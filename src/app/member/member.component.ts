import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { member } from 'src/model/member';
import { MemberService } from 'src/service/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  dataSource: member[] = [];
  displayedColumns: string[] = [
    'id', 'cin', 'name', 'prenom', 'email', 'date', 'photo', 'cv', 'type', 'createdDate', 'delete', 'edit'
  ];

  constructor(private ms: MemberService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ms.getAllMembers().subscribe((response) => {
      this.dataSource = response;
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.ms.delete(id).subscribe(() => {
          this.ms.getAllMembers().subscribe((response) => {
            this.dataSource = response;
          });
        });
      }
    });
  }
}

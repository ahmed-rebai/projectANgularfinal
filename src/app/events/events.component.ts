import { Component, OnInit } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

import { EvenementService } from 'src/service/evenement.service';
import { Evt } from 'src/model/evt';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', 'actions'];
  eventSource : Evt[]=[]

  constructor(private ES : EvenementService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.ES.getAllEvent().subscribe((response)=>{
      console.log("Received events from backend:", response);
      this.eventSource=response
    })
  }

  open(): void{
    const dialogRef = this.dialog.open(ModalComponent, {  
    });
    // récuperer les donnée du modal
    dialogRef.afterClosed().subscribe((data)=>{
      if (data==null){
        return;
      }
      this.ES.addEvent(data).subscribe(()=>{
        this.ES.getAllEvent().subscribe((response)=>{
          this.eventSource=response
        })
      })
    })
  }

  openid(id: string): void {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id };  // Passez l'ID ici
  
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // Mettez à jour l'événement via le service après modification
        this.ES.update(data, id).subscribe(() => {
          // Récupérez à nouveau tous les événements
          this.ES.getAllEvent().subscribe((response) => {
            this.eventSource = response;
          });
        });
      }
    });
  }
  

  delete(id: string): void {
    const confirmation = confirm('Êtes-vous sûr ? Cette action supprimera définitivement cet événement !');
    
    if (confirmation) {
      this.ES.deleteEvent(id).subscribe(() => {
        alert('L\'événement a été supprimé avec succès.');
        // Mise à jour de la liste des événements après suppression
        this.ES.getAllEvent().subscribe((response) => {
          this.eventSource = response;
        });
      });
    }
  }
  

}
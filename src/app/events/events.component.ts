import { Component, OnInit } from '@angular/core';
import { evt } from 'src/model/evt';
import { EvenementService } from 'src/service/evenement.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
data : evt[]=[]
constructor( private es: EvenementService, private Dialog:MatDialog){}

displayedColumns: string[] = ['id', 'title', 'dateDebut', 'dateFin','Lieu','delete','edit'];
  ngOnInit(): void {
    this.es.getAllevents().subscribe((response)=>{

      this.data=response
    }) 


  }
  delete(id:string):void{
    console.log(id);
  
    //1 lancer la boite (confirm component )
    //no93od nestana f thred mahloul o nestana f reponse
     const dialogRef =this.Dialog.open(ConfirmComponent);
    // attendre l resultat de l'utilisateur 
  dialogRef.afterClosed().subscribe((response)=>
  {
    if (response){
      this.es.delete(id).subscribe(()=>{
        //hna naml action eli ena nheb nchoufha f front bad matsir 
        // nawd nebath requette get bch yjiwni 
        this.es.getAllevents().subscribe((response)=>{
    
          this.data=response
        }) 
      });
    }
  })
    
  
  
  
  
  
  }
  open():void{
    let dialogRef = this.Dialog.open(ModalComponent, {
     
    });

    dialogRef.afterClosed().subscribe((data)=>{
     
        this.es.addEvent(data).subscribe(()=>{
          this.es.getAllevents().subscribe((response)=>{
            this.data=response;
          })
        })
      }
      )
    
  
  }

  openid(id:string):void{
    //lancer l'ouverture du modal 
    //envoyer id vers modal 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=(id);

   const DialogRef= this.Dialog.open(ModalComponent,dialogConfig);
DialogRef.afterClosed().subscribe((data)=>{
  if(data){
  this.es.update(data,id).subscribe(()=>{
    this.es.getAllevents().subscribe((response)=>{
      this.data=response;
    })

  })
}
})
 

  }
}

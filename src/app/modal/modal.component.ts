import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { evt } from 'src/model/evt';
import { EvenementService } from 'src/service/evenement.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

id!:string ;



  //forcage de type n7ebo composant yothhor dima sous forme de boite 
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) data:any, private es: EvenementService) {
this.id=data;
console.log(data);
if(!!this.id){
  this.es.getEventID(this.id).subscribe((evt)=>{
    this.initform1(evt);
  })
}

else{
  this.initform();
}

   }

  form!:FormGroup ;
 
  initform():void{
    // creation d'une nouvelle instance de form et initialisation des attributs
    // n7ebo doub man7elo formulaire ywali fer8
    this.form= new FormGroup ({
      title: new FormControl(null,[Validators.required]),
      dateDebut:  new FormControl(null,[Validators.required]),
      dateFin: new FormControl(null,[]),
      lieu: new FormControl(null,[Validators.required])
    })
  }
  initform1( evt :evt):void{
    this.form= new FormGroup({
     
      title: new FormControl(evt.title),
      dateDebut:  new FormControl(evt.dateDebut),
      dateFin: new FormControl(evt.dateFin),
      lieu: new FormControl(evt.lieu)

    })


  }


  save() {
    
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}


}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Evt } from 'src/model/evt';
import { EvenementService } from 'src/service/evenement.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  id!:string;

  //forcage de type
  constructor(public dialogRef: MatDialogRef<ModalComponent>, private ES:EvenementService, private router:Router, private activatedRoute:ActivatedRoute, @Inject(MAT_DIALOG_DATA) data:any) {
    if (data){
      this.id= data.id;
      if (!!this.id){
        this.ES.getEventById(this.id).subscribe((evt)=>{
          this.initFormId(evt);
        })
      }
    }
    else{
      this.initForm();
    }
  }
  form!: FormGroup;

  initForm():void{
    this.form=new FormGroup({
        yourfieldname:new FormControl(),
        titre: new FormControl(null,[Validators.required]),
        date: new FormControl(null,[Validators.required]),
        lieu: new FormControl(null,[]),
    })
  }

  initFormId(event: Evt):void{
    this.form=new FormGroup({
        yourfieldname:new FormControl(),
        titre: new FormControl(event.titre,[Validators.required]),
        date: new FormControl(event.date ,[Validators.required]),
        lieu: new FormControl(event.lieu,[]),
    })
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
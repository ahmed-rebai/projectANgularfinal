import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tools } from 'src/model/tools';
import { ToolService } from 'src/service/tool.service';

@Component({
  selector: 'app-tools-form',
  templateUrl: './tools-form.component.html',
  styleUrls: ['./tools-form.component.css']
})
export class ToolsFormComponent implements OnInit {
  form!: FormGroup;
  constructor(private Ms:ToolService,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    ///1 recuperer l id de la route active 
    
    const idCourant = this.activatedRoute.snapshot.params['id'];
    console.log(idCourant);
    if(!!idCourant){
      ///2 if id existe et a une valeur => je suis dans edit 
      this.Ms.gettools(idCourant).subscribe((response)=>{
        this.form = new FormGroup({
          id: new FormControl(null, [Validators.required]),
          link: new FormControl(response.link, [Validators.required])
        });
    
      })
    }
    else{
      ////3 
    this.initForm();

    }


    
    
  }
  initForm():void {
    this.form = new FormGroup({
      link: new FormControl(null, [Validators.required])
    });

  }
  sub(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if(!!idCourant){
      console.log(this.form.value);
    const m:tools={...this.form.value, createdDate: new Date()};
    this.Ms.edittools(m,idCourant).subscribe(()=>{
      this.router.navigate(['/tools']);})


    }
    else{
      console.log(this.form.value);
    const m:tools={...this.form.value, createdDate: new Date()};
    this.Ms.Createtools(m).subscribe(()=>{
      this.router.navigate(['/tools']);
    })

    }

    
  
  }

}

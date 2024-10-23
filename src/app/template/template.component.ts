import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/AuthService';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  showNavBar = false ;
  constructor(private as:AuthService, private router:Router){}

  
  

  logout():void{
    //injection de dependance 
  this.as.doLogout().then(()=>{
    this.router.navigate([''])
  })
   
  }
}

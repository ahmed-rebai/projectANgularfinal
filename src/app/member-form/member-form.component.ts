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
  form!:FormGroup ;

  constructor(private ms : MemberService , private router : Router,private activatedRoute :ActivatedRoute){}
  ngOnInit(){
    // bch namlo controle : 
    // premiere recupré id de la route 
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
    // if id exists et a une valeur  ena f edit a
    //truly  maneha ken fiha valeur
    if(!!idcourant){
     this.ms.getMemberById(idcourant).subscribe((member)=>{
      this.form= new FormGroup ({
        cin: new FormControl(member.cin,[Validators.required]),
        name:  new FormControl(member.name,[Validators.required]),
        cv: new FormControl(member.cv,[]),
        type: new FormControl(member.type,[Validators.required])

      })

     })
      
    }
    // sinon ena f create
    // f create naml init form 
  else{
    this.initform() ;
  }
}



 initform():void{
  // creation d'une nouvelle instance de form et initialisation des attributs
  // n7ebo doub man7elo formulaire ywali fer8
  this.form= new FormGroup ({
    cin: new FormControl(null,[Validators.required]),
    name:  new FormControl(null,[Validators.required]),
    cv: new FormControl(null,[]),
    type: new FormControl(null,[Validators.required])
  })
}

sub():void{
  const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
if(!!idcourant){
  const x= {...this.form.value,createdDate:new Date().toISOString()}
this.ms.updateMember(x,idcourant).subscribe(()=>{
  this.router.navigate(['/member'])
})
}
  //recuperer les donnees

  // hna n7eb n7ot les attributs mta form f x o nzidou les attributs ne9sin bch ywalili de type memeber
  // hethy syntaxe de l'extraction
  else{
  const x= {...this.form.value,createdDate:new Date().toISOString()}
this.ms.add(x).subscribe(()=>{
  this.router.navigate(['/member'])
});

  }



}





}


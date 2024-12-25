import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/service/article.service';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.css']
})
export class ArticlesFormComponent implements OnInit {
  form!:FormGroup ;
  
    constructor(private ms : ArticleService , private router : Router,private activatedRoute :ActivatedRoute){}
    ngOnInit(){
      // bch namlo controle : 
      // premiere recupré id de la route 
      const idcourant = this.activatedRoute.snapshot.params['id'];
      console.log(idcourant);
      // if id exists et a une valeur  ena f edit a
      //truly  maneha ken fiha valeur
      if(!!idcourant){
       this.ms.getarticles(idcourant).subscribe((article)=>{
        this.form= new FormGroup ({
          type: new FormControl(article.type,[Validators.required]),
          titre:  new FormControl(article.titre,[Validators.required]),
          link: new FormControl(article.link,[Validators.required]),
          Sourcepdf: new FormControl(article.Sourcepdf,[Validators.required])
  
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
      type: new FormControl(null,[Validators.required]),
      titre:  new FormControl(null,[Validators.required]),
      link: new FormControl(null,[Validators.required]),
      Sourcepdf: new FormControl(null,[Validators.required])
    })
  }
  
  sub():void{
    const idcourant = this.activatedRoute.snapshot.params['id'];
      console.log(idcourant);
  if(!!idcourant){
    const x= {...this.form.value,createdDate:new Date().toISOString()}
  this.ms.editarticles(x,idcourant).subscribe(()=>{
    this.router.navigate(['/articles'])
  })
  }
    //recuperer les donnees
  
    // hna n7eb n7ot les attributs mta form f x o nzidou les attributs ne9sin bch ywalili de type memeber
    // hethy syntaxe de l'extraction
    else{
    const x= {...this.form.value,createdDate:new Date().toISOString()}
  this.ms.Createarticles(x).subscribe(()=>{
    this.router.navigate(['/articles'])
  });
  
    }
  
  
  
  }

}

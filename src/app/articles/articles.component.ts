import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/service/article.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { articles } from 'src/model/articles';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource :  articles[]=[]
  constructor(private ms : ArticleService ,private dialog: MatDialog){}
  displayedColumns: string[] = ['id', 'type', 'titre', 'link','Sourcepdf','createdDate','delete','edit'];

  ngOnInit():void
  //appeler la fonction du service getAllMembers
  // attendte me resultat
  // une foiss on recoie la resultat l'affecter dans data source 
  {
    // {} : hethya post action post resultat 
    //() : hethya n7ot fha variable eli bch tjini fiha resultat 
  this.ms.getAllarticles().subscribe((response)=>{
  
    this.dataSource=response
  }) 
  
  }
  
  delete(id:string):void{
    console.log(id);
  
    //1 lancer la boite (confirm component )
    //no93od nestana f thred mahloul o nestana f reponse
     const dialogRef =this.dialog.open(ConfirmComponent);
    // attendre l resultat de l'utilisateur 
  dialogRef.afterClosed().subscribe((response)=>
  {
    if (response){
      this.ms.Deletearticles(id).subscribe(()=>{
        //hna naml action eli ena nheb nchoufha f front bad matsir 
        // nawd nebath requette get bch yjiwni 
        this.ms.getAllarticles().subscribe((response)=>{
    
          this.dataSource=response
        }) 
      });
    }
  })
    
  
  
  
  
  
  }

}

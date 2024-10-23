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
// premiere etape creer un tableau de memrbes
// 2 eme etape : afficher le tab html5 
// 3 eme etape afficher angular materiel 

dataSource : member[]=[]
// injection de depedance : mecanisme permet d'utiliser le service  : permet au composant d'utiliser le service 
// injection de depeance tsir ki nesn3 instance privé du service  f constructeur du composant  
constructor(private ms : MemberService ,private dialog: MatDialog){}
displayedColumns: string[] = ['id', 'cin', 'name', 'cv','type','createdDate','delete','edit'];
// ngOninit titloada avant le constructeur 
ngOnInit():void
//appeler la fonction du service getAllMembers
// attendte me resultat
// une foiss on recoie la resultat l'affecter dans data source 
{
  // {} : hethya post action post resultat 
  //() : hethya n7ot fha variable eli bch tjini fiha resultat 
this.ms.getAllMembers().subscribe((response)=>{

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
    this.ms.delete(id).subscribe(()=>{
      //hna naml action eli ena nheb nchoufha f front bad matsir 
      // nawd nebath requette get bch yjiwni 
      this.ms.getAllMembers().subscribe((response)=>{
  
        this.dataSource=response
      }) 
    });
  }
})
  





}

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tools } from 'src/model/tools';
import { ToolService } from 'src/service/tool.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})

export class ToolsComponent implements OnInit {
  displayedColumns: string[] = ['id','link','createdDate','icon','edit'];
  constructor(private ms : ToolService,private dialog:MatDialog){}
  dataSource : tools[]=[];
  ngOnInit(): void {
      //appleler la fonction de service getAllmembers 
      //attendre le rsumtat
      // une fois on recoit les => affecter sa,s le dayasource
      //PERMET DUTILISER LE SERVICE DANS LES COMPSOANT OU LES AUTRS SERVICES EN CREANT UNE INSTANCE PRIV2 DANS LE CONSTRUCTUER DU SERVICE A INJECTER 
      //this.ms.getAlltools.subscribe((a)=>{this.dataSource=a;})
      this.ms.getAlltools().subscribe((a)=>{this.dataSource=a;})
  }
  delete(id:string):void{/// lancer la boite de confirmation  attendre la resu de user et si click sur confirm
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe((response)=>{
      if (response){
        this.ms.Deletetools(id).subscribe(()=>{
          this.ms.getAlltools().subscribe((a)=>{this.dataSource=a;})
        })
      }
      
    })

    
    

  }



}

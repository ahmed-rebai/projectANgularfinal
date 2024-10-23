import { Component } from '@angular/core';
import { EvenementService } from 'src/service/evenement.service';
import { MemberService } from 'src/service/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NB_members:number=0 ;
  NB_tools:number=0 ;
  NB_events:number=0 ;
  NB_articles:number=0 ;
  nb_students: number =0 ;
  nb_teacher: number =0 ;
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ ]
    }
    
  ];
constructor(private ms:MemberService,private es: EvenementService){
  this.ms.getAllMembers().subscribe((data)=>{
    this.NB_members=data.length;
    for(let i =0 ;i<this.NB_members;i++){
      if (data[i].type=="student"){
        this.nb_students++ ;
      }
      else {
        this.nb_teacher ++;
      }
    }


    this.chartData= [
      {
        // ⤵️ Add these
        label: '$ in millions',
        data: [ this.nb_teacher,this.nb_students]
      }
    ];
   
    
  })

  this.es.getAllevents().subscribe((data)=>{
    this.NB_events=data.length
  })
 
}


chartLabels: string[] = ['nbTeachers','nbstudents'];
    chartOptions: ChartOptions = {};

}

import { Component, OnInit } from '@angular/core';
import { Evt } from 'src/model/evt';
import { EvenementService } from 'src/service/evenement.service';

@Component({
  selector: 'app-event-visit',
  templateUrl: './event-visit.component.html',
  styleUrls: ['./event-visit.component.css']
})
export class EventVisitComponent implements OnInit {
  displayedColumns: string[] = [ 'titre', 'date', 'lieu']; // Colonnes de la table
  events: Evt[] = [];

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe((data) => {
      this.events = data;
    });
  }
}
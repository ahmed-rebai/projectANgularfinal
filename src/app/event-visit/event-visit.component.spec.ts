import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVisitComponent } from './event-visit.component';

describe('EventVisitComponent', () => {
  let component: EventVisitComponent;
  let fixture: ComponentFixture<EventVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventVisitComponent]
    });
    fixture = TestBed.createComponent(EventVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

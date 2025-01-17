import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresVisitComponent } from './membres-visit.component';

describe('MembresVisitComponent', () => {
  let component: MembresVisitComponent;
  let fixture: ComponentFixture<MembresVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresVisitComponent]
    });
    fixture = TestBed.createComponent(MembresVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

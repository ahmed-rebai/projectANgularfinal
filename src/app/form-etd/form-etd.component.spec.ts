import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEtdComponent } from './form-etd.component';

describe('FormEtdComponent', () => {
  let component: FormEtdComponent;
  let fixture: ComponentFixture<FormEtdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEtdComponent]
    });
    fixture = TestBed.createComponent(FormEtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

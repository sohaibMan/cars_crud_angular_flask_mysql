import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTableComponent } from './cars-table.component';

describe('TableBasicExampleComponent', () => {
  let component: CarsTableComponent;
  let fixture: ComponentFixture<CarsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsTableComponent]
    });
    fixture = TestBed.createComponent(CarsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

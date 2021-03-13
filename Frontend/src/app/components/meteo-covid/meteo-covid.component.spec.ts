import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoCovidComponent } from './meteo-covid.component';

describe('MeteoCovidComponent', () => {
  let component: MeteoCovidComponent;
  let fixture: ComponentFixture<MeteoCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

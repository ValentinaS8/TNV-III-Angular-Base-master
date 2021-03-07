import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMeteoComponent } from './api-meteo.component';

describe('ApiMeteoComponent', () => {
  let component: ApiMeteoComponent;
  let fixture: ComponentFixture<ApiMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

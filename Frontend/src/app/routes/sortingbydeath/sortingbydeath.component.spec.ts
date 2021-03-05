import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingbydeathComponent } from './sortingbydeath.component';

describe('SortingbydeathComponent', () => {
  let component: SortingbydeathComponent;
  let fixture: ComponentFixture<SortingbydeathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingbydeathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingbydeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

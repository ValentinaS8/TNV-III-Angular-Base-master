import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDoubleComponent } from './filter-double.component';

describe('FilterDoubleComponent', () => {
  let component: FilterDoubleComponent;
  let fixture: ComponentFixture<FilterDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

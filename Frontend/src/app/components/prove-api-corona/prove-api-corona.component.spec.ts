import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveApiCoronaComponent } from './prove-api-corona.component';

describe('ProveApiCoronaComponent', () => {
  let component: ProveApiCoronaComponent;
  let fixture: ComponentFixture<ProveApiCoronaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveApiCoronaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveApiCoronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

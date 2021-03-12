import { TestBed } from '@angular/core/testing';

import { ApiMeteoService } from './api-meteo.service';

describe('ApiMeteoService', () => {
  let service: ApiMeteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

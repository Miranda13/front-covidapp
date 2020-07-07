import { TestBed } from '@angular/core/testing';

import { TraerDataEdadesService } from './traer-data-edades.service';

describe('TraerDataEdadesService', () => {
  let service: TraerDataEdadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDataEdadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

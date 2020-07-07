import { TestBed } from '@angular/core/testing';

import { TraerDeptoSexStateDataService } from './traer-depto-sex-state-data.service';

describe('TraerDeptoSexStateDataService', () => {
  let service: TraerDeptoSexStateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDeptoSexStateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

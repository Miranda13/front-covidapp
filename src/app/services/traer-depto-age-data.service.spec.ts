import { TestBed } from '@angular/core/testing';

import { TraerDeptoAgeDataService } from './traer-depto-age-data.service';

describe('TraerDeptoAgeDataService', () => {
  let service: TraerDeptoAgeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDeptoAgeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

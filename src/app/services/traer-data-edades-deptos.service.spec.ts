import { TestBed } from '@angular/core/testing';

import { TraerDataEdadesDeptosService } from './traer-data-edades-deptos.service';

describe('TraerDataEdadesDeptosService', () => {
  let service: TraerDataEdadesDeptosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDataEdadesDeptosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TraerDataGraficosService } from './traer-data-graficos.service';

describe('TraerDataGraficosService', () => {
  let service: TraerDataGraficosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDataGraficosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

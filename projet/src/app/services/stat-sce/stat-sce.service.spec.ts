import { TestBed } from '@angular/core/testing';

import { StatSceService } from './stat-sce.service';

describe('StatSceService', () => {
  let service: StatSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

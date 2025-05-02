import { TestBed } from '@angular/core/testing';

import { EmployeurSceService } from './employeur-sce.service';

describe('EmployeurSceService', () => {
  let service: EmployeurSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeurSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

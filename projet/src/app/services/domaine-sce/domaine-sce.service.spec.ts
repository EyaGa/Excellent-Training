import { TestBed } from '@angular/core/testing';

import { DomaineSceService } from '../domaine-sce/domaine-sce.service';

describe('DomaineSceService', () => {
  let service: DomaineSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomaineSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

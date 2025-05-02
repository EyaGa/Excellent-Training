import { TestBed } from '@angular/core/testing';

import { StructureSceService } from '../structure-sce/structure-sce.service';

describe('StructureSceService', () => {
  let service: StructureSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

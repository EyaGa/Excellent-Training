import { TestBed } from '@angular/core/testing';

import { FormateurSceService } from '../formateur-sce/formateur-sce.service';

describe('FormateurSceService', () => {
  let service: FormateurSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateurSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

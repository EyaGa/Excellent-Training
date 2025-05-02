import { TestBed } from '@angular/core/testing';

import { FormationSceService } from '../formation-sce/formation-sce.service';

describe('FormationSceService', () => {
  let service: FormationSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

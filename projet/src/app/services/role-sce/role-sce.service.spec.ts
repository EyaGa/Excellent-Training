import { TestBed } from '@angular/core/testing';

import { RoleSceService } from '../role-sce/role-sce.service';

describe('RoleSceService', () => {
  let service: RoleSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

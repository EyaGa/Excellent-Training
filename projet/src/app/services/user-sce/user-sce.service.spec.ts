import { TestBed } from '@angular/core/testing';

import { UserSceService } from '../user-sce/user-sce.service';

describe('UserSceService', () => {
  let service: UserSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

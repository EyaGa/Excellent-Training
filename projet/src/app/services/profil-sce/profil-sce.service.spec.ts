import { TestBed } from '@angular/core/testing';

import { ProfilSceService } from './profil-sce.service';

describe('ProfilSceService', () => {
  let service: ProfilSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ParticipantSceService } from '../participant-sce/participant-sce.service';

describe('ParticipantSceService', () => {
  let service: ParticipantSceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantSceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

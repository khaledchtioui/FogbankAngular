import { TestBed } from '@angular/core/testing';

import { ClubEventcomService } from './club-eventcom.service';

describe('ClubEventcomService', () => {
  let service: ClubEventcomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubEventcomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

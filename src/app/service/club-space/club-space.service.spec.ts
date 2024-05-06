import { TestBed } from '@angular/core/testing';

import { ClubSpaceService } from './club-space.service';

describe('ClubSpaceService', () => {
  let service: ClubSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AdhésionService } from './adhésion.service';

describe('AdhésionService', () => {
  let service: AdhésionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhésionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

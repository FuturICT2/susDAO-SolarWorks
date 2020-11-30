import { TestBed } from '@angular/core/testing';

import { SmcService } from './smc.service';

describe('SmcService', () => {
  let service: SmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

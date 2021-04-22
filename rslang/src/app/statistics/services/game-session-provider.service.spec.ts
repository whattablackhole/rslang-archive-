import { TestBed } from '@angular/core/testing';

import { GSProviderService } from './gs-provider.service';

describe('GameSessionProviderService', () => {
  let service: GSProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GSProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

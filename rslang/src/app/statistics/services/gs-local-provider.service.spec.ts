import { TestBed } from '@angular/core/testing';

import { GSLocalProviderService } from './gs-local-provider.service';

describe('GsLocalProviderService', () => {
  let service: GSLocalProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GSLocalProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

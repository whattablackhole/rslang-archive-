import { TestBed } from '@angular/core/testing';

import { EbookProviderService } from './ebook-provider.service';

describe('EbbokProviderService', () => {
  let service: EbookProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

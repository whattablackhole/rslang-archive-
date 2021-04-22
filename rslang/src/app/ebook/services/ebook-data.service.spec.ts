import { TestBed } from '@angular/core/testing';

import { EbookDataService } from './ebook-data.service';

describe('EbookDataService', () => {
  let service: EbookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

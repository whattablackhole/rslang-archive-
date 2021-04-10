import { TestBed } from '@angular/core/testing';

import { EbookSettingsService } from './ebook-settings.service';

describe('EbookSettingsInitService', () => {
  let service: EbookSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

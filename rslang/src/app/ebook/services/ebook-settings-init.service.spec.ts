import { TestBed } from '@angular/core/testing';

import { EbookSettingsInitService } from './ebook-settings-init.service';

describe('EbookSettingsInitService', () => {
  let service: EbookSettingsInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookSettingsInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

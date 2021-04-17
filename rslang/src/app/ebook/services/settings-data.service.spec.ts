import { TestBed } from '@angular/core/testing';

import { SettingsDataService } from './settings-data.service';

describe('SettingsService', () => {
  let service: SettingsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

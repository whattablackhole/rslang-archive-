import { TestBed } from '@angular/core/testing';

import { SettingsActionService } from './settings-action.service';

describe('SettingsActionService', () => {
  let service: SettingsActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

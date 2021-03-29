import { TestBed } from '@angular/core/testing';

import { AbstractStorageService } from './abstract-storage.service';

describe('AbstractStorageService', () => {
  let service: AbstractStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserWordActionService } from './user-word-action.service';

describe('UserWordAction.ServiceService', () => {
  let service: UserWordActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWordActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthPocketbaseService } from './auth-pocketbase.service';

describe('AuthPocketbaseService', () => {
  let service: AuthPocketbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPocketbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

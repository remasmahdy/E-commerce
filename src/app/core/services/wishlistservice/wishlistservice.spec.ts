import { TestBed } from '@angular/core/testing';

import { Wishlistservice } from './wishlistservice';

describe('Wishlistservice', () => {
  let service: Wishlistservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wishlistservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Forgotservice } from './forgotservice';

describe('Forgotservice', () => {
  let service: Forgotservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Forgotservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

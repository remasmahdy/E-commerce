import { TestBed } from '@angular/core/testing';

import { Brandsservice } from './brandsservice';

describe('Brandsservice', () => {
  let service: Brandsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Brandsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

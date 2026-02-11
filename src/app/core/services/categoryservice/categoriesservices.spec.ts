import { TestBed } from '@angular/core/testing';

import { Categoriesservices } from './categoriesservices';

describe('Categoriesservices', () => {
  let service: Categoriesservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categoriesservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

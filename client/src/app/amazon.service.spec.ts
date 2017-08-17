import { TestBed, inject } from '@angular/core/testing';

import { AmazonService } from './amazon.service';

describe('AmazonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmazonService]
    });
  });

  it('should be created', inject([AmazonService], (service: AmazonService) => {
    expect(service).toBeTruthy();
  }));
});

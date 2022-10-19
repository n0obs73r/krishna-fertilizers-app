import { TestBed } from '@angular/core/testing';

import { ProductSubmissionService } from './product-submission.service';

describe('ProductSubmissionService', () => {
  let service: ProductSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

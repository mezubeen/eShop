import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product-save.service';

describe('ProductSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});

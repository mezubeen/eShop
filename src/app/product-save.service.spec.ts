import { TestBed, inject } from '@angular/core/testing';

import { ProductSaveService } from './product-save.service';

describe('ProductSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSaveService]
    });
  });

  it('should be created', inject([ProductSaveService], (service: ProductSaveService) => {
    expect(service).toBeTruthy();
  }));
});

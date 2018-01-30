import { Component, OnInit } from '@angular/core';
import { ProductSaveService } from '../../product-save.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
product$;

  constructor(private productService: ProductSaveService) {
   this.product$ = this.productService.getAll();
   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductSaveService } from '../../product-save.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  product: {title: string}[];
  subscription: Subscription;
  filteredProducts: any[];

  constructor(private productService: ProductSaveService) {
   this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.product = products);
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.product.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.product;
  }

}

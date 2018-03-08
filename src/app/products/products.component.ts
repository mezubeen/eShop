import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products: Product[] = [];
  filteredProducts: Product[] = []
  category: string;
  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {



  }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    this.productService
      .getAll()
      .subscribe(products => {
      this.Products = products

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.Products.filter(p => p.category === this.category) :
    this.Products;
  }

}

import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  Products: Product[] = [];
  filteredProducts: Product[] = []
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    productService.getAll().subscribe(products => {
      this.Products = products

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.Products.filter(p => p.category === this.category) :
          this.Products;

      });

    });


  }

  async ngOnInit(){
    (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }


}

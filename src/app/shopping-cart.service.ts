import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts').push({

      dateCreated: new Date().getTime()
    });
  }

  //For reading an exisitng shopping cart
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  //For creating a shopping cart

  // private getOrCreateCartId(){
  //   let cartId = localStorage.getItem('cardId');
  // if(!cartId){
  //   this.create().then(result => {
  //     localStorage.setItem('cartId', result.key);

  //     return this.getCart(result.key);
  //   });
  // }else{
  //   return this.getCart(cartId);
  // }

  //Shorter Implementation

  //TO MAKE CALL A ASYNC METHOD AS SYNCRONUS WE HAVE TO DECORATE THE METHOD AS "async" and PUT "await" NEAR THE RESULT
  // THIS WILL PREVENT US TO USE ".then" KEYWORD ON PROMISES AND THE METHOD WILL EXCUTE LINEARLY AND WE DON'T HAVE TO WAIT
  // FOR THE RESULT OF THE PROMISES 
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }


  async addToCart(product: Product) {
    this,this.updateCartQuantity(product,1);
  }

  removeFromCart(product: Product){
    this,this.updateCartQuantity(product,-1);
  }

  private async updateCartQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change });
    });
  }
}
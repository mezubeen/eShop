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

  //For reading an exisitng shopping cart
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this, this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this, this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }



  private create() {
    return this.db.list('/shopping-carts').push({

      dateCreated: new Date().getTime()
    });
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



  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;

      //if quantity is zero in shopping cart we remove it immediately.
      if (quantity === 0) item$.remove();
      else
          item$.update({
          // product: product, 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
      });
    });
  }
}
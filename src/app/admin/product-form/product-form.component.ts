import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product = {};
id;

  constructor(
    categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productSaveService: ProductService) {
      //retrieving the categories for the dropdown
    this.categories$ = categoryService.getAll();

     this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) this.productSaveService.getProduct(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product){
    if(this.id) this.productSaveService.updateProduct(this.id, product);
    else this.productSaveService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure want to delete this product?')) return;

    this.productSaveService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}

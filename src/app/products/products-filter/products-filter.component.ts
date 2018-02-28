import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  Categories$;
  @Input('category') category;

  constructor(categoryService: CategoryService) { 
    this.Categories$ = categoryService.getAll();

  }

  ngOnInit() {
  }

}

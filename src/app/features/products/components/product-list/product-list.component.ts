import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    imports: [],
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  
  #productService = inject(ProductService)

  products = this.#productService.productList;

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.#productService.getProducts().subscribe(response => {
      this.#productService.productList.set(response)
    });
  }

  addItemToCart(product: Product){
    this.#productService.addToCart(product)
  }



}

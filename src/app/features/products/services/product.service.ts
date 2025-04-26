import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product, ProductCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient)

  private productDataUrl = 'assets/data/products.json';
  productList = signal<Product[]>([])
  productCart = signal<ProductCart>({
    products: [],
    totalPrice: 0
  })

  getProducts(): Observable<Product[]>{
    return this.#http.get<Product[]>(this.productDataUrl).pipe(
      map((response:Product[]) => response)
    )
  }

  getAllProducts(){
    return this.productList()
  }

  getNumberOfProducts(){
    return this.productList()
  }

  getCart(): ProductCart{
    return this.productCart()
  }

  addToCart(product: Product){
    this.productCart.update(value => {
      return {
        products: [...value?.products, product],
        totalPrice: value?.totalPrice + product.price
      }
    })
  }
  

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient)

  private productDataUrl = 'assets/data/products.json';
  productList = signal<Product[]>([])
  cart = signal<number>(0)

  getProducts(): Observable<Product[]>{
    return this.#http.get<Product[]>(this.productDataUrl).pipe(
      map((response:Product[]) => response)
    )
  }

}

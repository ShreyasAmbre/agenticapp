import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../features/products/services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCart } from '../../../features/products/models/product.model';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #producService = inject(ProductService);

  productCart = this.#producService.productCart
  
}

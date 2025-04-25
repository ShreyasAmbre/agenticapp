import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../features/products/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [
        RouterOutlet,
        CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #producService = inject(ProductService);

  cartPrice = this.#producService.cart
  
}

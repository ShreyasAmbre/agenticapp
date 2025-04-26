import { Component } from '@angular/core';
import { ProductChatLayoutComponent } from '../../shared/layouts/product-chat-layout/product-chat-layout.component';
import { ChatHistoryComponent } from '../../features/chat-agent/components/chat-history/chat-history.component';
import { ProductListComponent } from '../../features/products/components/product-list/product-list.component';

@Component({
    selector: 'app-home',
    imports: [
        ProductChatLayoutComponent,
        ProductListComponent,
        ChatHistoryComponent,
    ],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}

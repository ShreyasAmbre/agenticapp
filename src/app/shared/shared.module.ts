import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductChatLayoutComponent } from './layouts/product-chat-layout/product-chat-layout.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProductChatLayoutComponent
  ]
})
export class SharedModule { }

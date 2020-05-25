import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';


import { ProductsRoutingModule } from './products-routing.module';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductImageComponent } from './components/product-image/product-image.component';


@NgModule({
  declarations: [RegisterProductComponent, ProductsComponent, ProductImageComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProductsModule { } 

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { AuthorizeGuard } from '../../guards/authorize.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ProductsComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'register-product', component: RegisterProductComponent,
        canActivate: [AuthorizeGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

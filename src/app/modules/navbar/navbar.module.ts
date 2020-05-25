import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { NavbarRoutingModule } from './navbar-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }

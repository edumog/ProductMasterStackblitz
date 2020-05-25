import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  productForm: FormGroup;
  product: ProductModel;
  countries: any;
  image: any;
  isCountriesLoading: boolean;

  constructor(private countriesService: CountriesService, private productsService: ProductsService) {
    this.isCountriesLoading = true;
    this.loadCountries();
    this.createForm();
  }

  private loadCountries() {
    this.countriesService.getCountries().subscribe((response: any) => {
      this.countries = response;
      this.isCountriesLoading = false;
    })
  }

  private createForm() {
    this.productForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'features': new FormControl('', Validators.required),
      'releaseDate': new FormControl(),
      'manufacturerEmail': new FormControl('', [Validators.pattern("^[a-zA-Z0-9\-_+.]+@[a-zA-Z0-9-_+.]+$")]),
      'countryOfManufacture': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.min(0)]),
      'unitsAvailable': new FormControl('', [Validators.required, Validators.min(0)]),
      'soldUnits': new FormControl('', [Validators.required, Validators.min(0)]),
      'image': new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  sendForm() { 
    if(this.productForm.valid) {
      this.product = this.productForm.value;
      this.setPrice(this.product.countryOfManufacture);
      this.productsService.registerProduct(this.product, this.image).subscribe(() => {
        this.throwAlert();
      });
      this.productForm.reset();
    }

  }
  private setPrice(countryName: string) {
    if (countryName){
      let country = this.countries.find(country => country.name === countryName);
      this.product.price = `${ this.product.price }${ country.currencies[0].symbol} (${ country.currencies[0].name})`;
    }
  }
  private throwAlert() {
    Swal.fire({
      title: 'Producto creado',
      html: 'Se ha añadido un nuevo producto.',
      timer: 2500
    });
  }

  setImage(event: any) {
    this.image = event.target.files[0];
  }
}

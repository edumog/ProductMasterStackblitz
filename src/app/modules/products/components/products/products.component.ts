import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CountriesService } from '../../services/countries.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  filtersForm: FormGroup;
  products: ProductModel[];
  isItSortAscendingById: boolean;
  isItSortAscendingByName: boolean;
  countries: any;
  isCountriesLoading: boolean;
  page: number;

  constructor(private countriesService: CountriesService, private productsService: ProductsService) {
    this.isCountriesLoading = false;
    this.isItSortAscendingById = true;
    this.isItSortAscendingByName = true;
    this.loadCountries();
    this.createFiltersForm();
    this.getProducts();
  }

  private loadCountries() {
    this.countriesService.getCountries().subscribe((response: any) => {
      this.countries = response;
      this.isCountriesLoading = false;
    });  
  }
  private getProducts() {
    this.productsService.getProducts().subscribe((response:any) => {
      this.products = response;
    });
  }

  private createFiltersForm() {
    this.filtersForm = new FormGroup({
      'country': new FormControl(),
      'minValue': new FormControl(),
      'maxValue': new FormControl()
    });
  }

  ngOnInit(): void {
  }

  applyFilters() {
    this.productsService.getProducts().subscribe((response: any) => {
      this.products = response;
      this.filterByCountry(this.filtersForm.value.country); 
      this.filterByQuantitySold(this.filtersForm.value.minValue, this.filtersForm.value.maxValue);   
      this.filtersForm.reset();
    })  
  }

  private filterByCountry(countryName: string) {
    if(countryName !== "" && countryName !== null) {
      this.products = this.getProductsByCountry(countryName);
    }
  }

  private getProductsByCountry(countryName: string) {
    const productsByCountry: ProductModel[] = [];
    this.products.forEach(product => {
      if(product.countryOfManufacture === countryName)
        productsByCountry.push(product);
    });
    return productsByCountry;
  }

  private filterByQuantitySold(min: number, max: number) {
    if(min < max && max > 0)
      this.products = this.getProductsByQuantityRangeSold(min, max);
  }

  private getProductsByQuantityRangeSold(minValue: number, maxValue: number) {
    const productsInRange: ProductModel[] = [];
    this.products.forEach(product => {
      if(product.soldUnits >= minValue && product.soldUnits <= maxValue)
        productsInRange.push(product);
    });
    return productsInRange;
  }

  public sortById() {
    this.isItSortAscendingById = !this.isItSortAscendingById;
    if(this.isItSortAscendingById) 
      this.sortAscendingById();
    else
      this.sortDescendingById();
  }
  private sortAscendingById() {
    this.products.sort((current, next) => {
      if(current.id > next.id)
        return 1;
      else if(current.id < next.id)
        return -1;
      else
        return 0;
    });
  }
  private sortDescendingById() {
    this.products.sort((current, next) => {
      if(current.id < next.id)
        return 1;
      else if(current.id > next.id)
        return -1;
      else
        return 0;
    });
  }

  sortByName() {
    this.isItSortAscendingByName = !this.isItSortAscendingByName;
    if(this.isItSortAscendingByName)
      this.sortAscendingByname();
    else
      this.sortDescendingByName();
  }
  sortAscendingByname() {
    this.products.sort((current, next) => {
      if(current.name > next.name)
        return 1;
      else if(current.name < next.name)
        return -1;
      else
        return 0;
    });
  }

  sortDescendingByName() {
    this.products.sort((current, next) => {
      if(current.name < next.name)
        return 1;
      else if(current.name > next.name)
        return -1;
      else
        return 0;
    });
  }

  delete(productId: string) {
    Swal.fire({
      title: 'Desea continuar',
      text: '¡Se borrará el producto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((response) => {
      if(response.value) { 
        this.productsService.deleteProduct(productId).subscribe(() =>{
          this.getProducts();
        });
      }
    });
  }
}

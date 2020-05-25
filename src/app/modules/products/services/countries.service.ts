import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://restcountries.eu/rest/v2'
  }

  getCountries() {
    return this.http.get(`${ this.url }`);
  }
}

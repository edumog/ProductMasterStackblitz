import { Injectable } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string;
  private products: ProductModel[];
  private postComplete = new Subject();

  constructor(private http:HttpClient, private storage: AngularFireStorage) { 
    this.url = 'https://productmaster-c8132.firebaseio.com/products';
  }

  public getProducts() {
    return this.http.get(`${ this.url }.json`).pipe(map((response: any) => this.setProductList(response)));
  }
  private setProductList(response: object) { 
    this.products = [];
    if(response != null) {
      this.addToProducts(response);
    }  
    return this.products;
  }
  private addToProducts(response: object) {
    Object.keys(response).forEach((key:string) => {
      const product: ProductModel = response[key];
      product.id = key;
      this.products.push(product);
    });
  }

  public getProductsByCountry(countryName: string) {
    let productsByCountry = [];
    this.products.forEach(product => {
      if(product.countryOfManufacture === countryName)
        productsByCountry.push(product);
    });
    return productsByCountry;
  }

  public getProductsByQuantityRangeSold(minValue: number, maxValue: number) {
    let productsInRange = [];
    this.products.forEach(product => {
      if(product.soldUnits >= minValue && product.soldUnits <= maxValue)
        productsInRange.push(product);
    });
    return productsInRange;
  }

  registerProduct(product: ProductModel, image: any) {
    if(image != null)
      this.processRequest(product, image);
    else {
      product.image = 'https://firebasestorage.googleapis.com/v0/b/productmaster-c8132.appspot.com/o/noImage.jpg?alt=media&token=b8e12b18-0f58-46b9-9728-b718d4fdd8eb';
      this.postProduct(product);
    }
    return this.postComplete.asObservable();
  }
  private processRequest(product: ProductModel, image: any) {
    const imagePath = product.name;
    const imageRef = this.storage.ref(imagePath);
    const task = this.storage.upload(imagePath, image);
    this.waitForUrlImageToPost(product, task, imageRef);
  }
  private waitForUrlImageToPost(product: ProductModel, task: AngularFireUploadTask, imageRef: AngularFireStorageReference) {
    task.snapshotChanges().pipe(finalize(() => {
      console.log('La imagen se subio');
      imageRef.getDownloadURL().subscribe((response:any) => {
        product.image = response;
        this.postProduct(product);
      })
    })).subscribe();
  }
  private postProduct(product: ProductModel) {
    this.http.post(`${ this.url }.json`, product).subscribe(() => {
      this.postComplete.next();
    }); 
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${ this.url }/${ productId }.json`);
  }
}

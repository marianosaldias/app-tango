import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  products: Product[];
  type: string;

  readonly URL_API = 'http://localhost:3000/api/products/';

  constructor(private http: HttpClient) { 
    this.selectedProduct = new Product();
  }

  getProducts() {
    return this.http.get(this.URL_API);
  }

  getProductsByType(type: string) {
    return this.http.get(this.URL_API + 'filter/' + type);
  }  

  postProduct(Product: Product) {
    return this.http.post(this.URL_API, Product);
  }  

  putProduct(product: Product) {
    //return this.http.put(this.URL_API + `/${product._id}`, product);
    return this.http.put(this.URL_API + '/' + product._id, product);
  }    

  deleteProduct(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }      

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  url = 'http://localhost:54525/api/product'
  constructor(private http: HttpClient) { }

  GetProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + '/AllProducts');
  }

  GetProductById(productId:number): Observable<Product>{    
    return this.http.get<Product>(this.url +'/GetProductById/' + productId)
  }

  getTotalQuantity():Observable<number>{
    return this.http.get<number>(this.url + '/GetTotalQuantity')
  }

  getSingleProductQuantity(productId:number):Observable<number>{
    return this.http.get<number>(this.url +'/GetSingleProductQuantity/' + productId)

  }

  addSingleProductQuantity(productId:number):Observable<number>{
    const httpOption = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<number>(this.url +'/PostAddSingleProductQuantity/' + productId , httpOption);

  }

  substracSingleProductQuantity(productId:number):Observable<number>{
    const httpOption = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<number>(this.url +'/PostRemoveSingleProductQuantity/' + productId, httpOption);

  }

  

}

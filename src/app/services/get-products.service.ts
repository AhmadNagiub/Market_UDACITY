import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts():Observable<any>{
    return this._HttpClient.get<Product>('././assets/data.json');
  }
  getProductDetails(id:number){

     this.getProducts().subscribe(res =>{
      res.forEach((el:any) => {
          if(el.id === id){
            return el;
          }
      });
    })
  }
}

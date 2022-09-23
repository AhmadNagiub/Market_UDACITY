import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  item:any;
  cartPriducts: any;
  constructor(private _GetProductsService:GetProductsService) { }

  ngOnInit(): void {
    this._GetProductsService.getProducts().subscribe(res=>{
      this.products=res


    });
    // console.l.;og(this.item.product)
    
  }
  addToCart(event:any){
    this.cartPriducts=[]
    if(localStorage.getItem('cart')){
      this.cartPriducts=JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartPriducts.find((item:any) => item.item?.id == event.item?.id)
      if(exist){
        alert('product is Already in the cart')
      }
      else{
        this.cartPriducts.push(event)
        localStorage.setItem('cart', JSON.stringify(this.cartPriducts))
      }
    }else{
      this.cartPriducts.push(event)
      localStorage.setItem('cart', JSON.stringify(this.cartPriducts))
    }
  }
}

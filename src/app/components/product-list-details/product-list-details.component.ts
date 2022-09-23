import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-product-list-details',
  templateUrl: './product-list-details.component.html',
  styleUrls: ['./product-list-details.component.css']
})
export class ProductListDetailsComponent implements OnInit {

  //  id:any;
   prodDetails:any;
     addCart:FormGroup = new FormGroup({
 'amount' : new FormControl('select' ,[Validators.required]),
  })
options:Array<number> = [1,2,3,4,5,6,7,8,9,10];
  cartPriducts: any;
  constructor(private route:ActivatedRoute , private _GetProductsService:GetProductsService) { }
  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id')
    this._GetProductsService.getProducts().subscribe(res=>{
      res.forEach((el:any)=>{
        if(el.id == this.route.snapshot.paramMap.get('id')){
          this.prodDetails=el
        }
      })

    });
  }

  addToCart(){
    this.cartPriducts=[]
    if(localStorage.getItem('cart')){
      this.cartPriducts=JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartPriducts.find((item:any) => item.item?.id ==this.prodDetails?.id)
      if(exist){
        alert('product is Already in the cart')
      }
      else{
        this.cartPriducts.push({item:this.prodDetails, quantity:this.addCart.value.amount})
        localStorage.setItem('cart', JSON.stringify(this.cartPriducts))
      }
    }else{
      this.cartPriducts.push({item:this.prodDetails, quantity:this.addCart.value.amount})
      localStorage.setItem('cart', JSON.stringify(this.cartPriducts))
    }
  }
}

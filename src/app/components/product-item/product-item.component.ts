import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() 
  product!: Product;
  // item:any
  options:Array<number> = [1,2,3,4,5,6,7,8,9,10];
  carts:any;
  @Output() item =new EventEmitter();
  cartss:any=localStorage.getItem('cart');
  addCart:FormGroup = new FormGroup({
 'amount' : new FormControl('select' ,[Validators.required]),
  })
  constructor() { }
  ngOnInit(): void {
    this.carts = JSON.parse(this.cartss) ? JSON.parse(this.cartss) : []
  }

  addToCart(){
    if(!isNaN(this.addCart.value.amount )  ){
    this.item.emit({item:this.product, quantity:this.addCart.value.amount});
    }
  }

}

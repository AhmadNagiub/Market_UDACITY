import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartString:any = localStorage.getItem('cart');
  carts:Cart[]=[];
  order:any = localStorage.getItem('orders');
  orders:Array<{}>=[];
  confirmation:FormGroup= new FormGroup({
    'fullName':new FormControl(null ,[Validators.required , Validators.minLength(3)] ),
    'address':new FormControl(null , [Validators.required , Validators.minLength(6)] ),
    'credit' :new FormControl(null , [Validators.required , Validators.minLength(16)])
  });
  msg:boolean=false;
  constructor(private route:Router) { 
    
  }
  
  ngOnInit(): void {
    this.orders = JSON.parse(this.order) ? JSON.parse(this.order) : []
    this.addToCart()

    this.getTotal()
  }
  
    addToCart(){
    return this.carts = JSON.parse(this.cartString) ? JSON.parse(this.cartString) : []
  }
  errorCheck(controlName:any){
    return this.confirmation.get(controlName)?.errors && this.confirmation.get(controlName)?.touched
  }

  confirm(){
    if(this.confirmation.valid){
      let confirmCart = {
        id:this.generateid(),
        information:this.confirmation.value,
        cart:this.carts,
        total:this.sum
      }

      this.orders.push(confirmCart);

      localStorage.setItem('orders' , JSON.stringify(this.orders) )

      localStorage.removeItem('cart');

      this.route.navigate([`/confirmation/${confirmCart.id}`])
    }else{
      this.msg=true;
      setTimeout(()=>{
        this.msg =false
      } , 2000)
    }
  }

  generateid(){
    return Math.floor(Math.random()*100)
  }
  sum:any=0;

  getTotal(){
    this.sum=0
    if(this.carts){
      this.carts.forEach((element:any) => {
        this.sum += element.item.price * element.quantity 
      });
      Math.floor(this.sum)
    }
    
  }
 changeValue(index:any,e:any){
   let updatedItem = {
    item:this.carts[index].item,
    quantity:this.carts[index].quantity 
  }
  this.carts[index] = updatedItem;
  localStorage.setItem('cart' , JSON.stringify(this.carts));
  this.getTotal();
  e.target.focus()
  }


  Delete(item:any){
    let newCarts = this.carts.filter(el=>el.item.id !== item.id);
    localStorage.setItem('cart' , JSON.stringify(newCarts ));
    this.reload('/cart')
  }
   async reload(url: string): Promise<boolean> {
    await this.route.navigateByUrl('/', { skipLocationChange: true });
    return this.route.navigateByUrl(url);
  }
}
interface Cart{
  item:{price:any , name:any , url:any , id:any},
  quantity:any
}

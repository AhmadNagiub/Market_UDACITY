import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  getFormLocal:string = localStorage.getItem('orders')!;
  orders:Array<{id:0,cart:{},information:{} , total:any}> = JSON.parse(this.getFormLocal)
  constructor(private route : ActivatedRoute) { }
  id:any; 
  total:any

  order:{ fullName: ''; address: '';credit:'' } | undefined;
  ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('confId');
  this.getOrder(this.id)
  }

  getOrder(id:any){
     this.orders.forEach((el:any) => {
      if(el.id == id){
        this.order=el.information
        this.total =el.total
      }
  });
  }
  

}

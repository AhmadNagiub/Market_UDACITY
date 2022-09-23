import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductListDetailsComponent } from './components/product-list-details/product-list-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path:'' , redirectTo:'products', pathMatch:'full'},
  {path:'products' , component:ProductListComponent},
  {path:'products/:id' , component:ProductListDetailsComponent},
  {path:'cart' ,component:CartComponent},
  {path:'confirmation/:confId' , component:ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

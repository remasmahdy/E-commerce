import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common'; 
import { Cartservice } from '../../core/services/cartservices/cartservice';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{

  private readonly cartservice = inject(Cartservice)
  private readonly toastrService=inject(ToastrService)
  private readonly platformId = inject(PLATFORM_ID);


  cartDetails : Icart = {} as Icart ;
  
  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('myToken')) {
        this.getCartData();
      }
    }
  }

  getCartData(): void {
    this.cartservice.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartDetails=res.data
      }
    })
  }

  deleteItem(id :string):void{
    this.cartservice.removeSpecificItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data
        this.toastrService.success('Product Removed Successfuly' ,'' ,{toastClass:'ngx-toastr custom-error-toastr'})
        this.cartservice.cartNumber.set(res.numOfCartItems)
      }
        })
  }

  updateQuantity(quantity:any , id:string):void{
    this.cartservice.updateCartProductQuantity(quantity,id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data
      }
    })

  }
  
  deleteCart():void{
    this.cartservice.clearUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails= {}as Icart
        this.toastrService.success('Done!' ,'' ,{toastClass:'ngx-toastr custom-error-toastr'})
        this.cartservice.cartNumber.set(0)
      }
    })
  }
  
}

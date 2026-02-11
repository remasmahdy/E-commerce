import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/services/product/products';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Cartservice } from '../../core/services/cartservices/cartservice';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlistservice/wishlistservice';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly products_service = inject(Products)

  private readonly cartservice=inject(Cartservice)
  private readonly toastrService=inject(ToastrService)
  private readonly wishlistService = inject(WishlistService) 
  private readonly platformId = inject(PLATFORM_ID) 
  
  myProducts :Iproduct[]=[]

  prodID:any ;
  prodData:Iproduct | null =null ;
  wishlistIds: string[] = []; 
  
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe ({
      next:(res)=>{
        this.prodID =res.get('id')

        this.products_service.getSpecificProducts(this.prodID).subscribe({
          next:(res)=>{
            
            this.prodData= res.data
            console.log(this.prodData)
          }
        })
      }
    })


    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('myToken')) {
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
          
            this.wishlistIds = res.data.map((item: any) => item._id);
          }
        });
      }
    }
  }

  addProductToCart(id:string):void{
    this.cartservice.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success( res.message , ' ');
        this.cartservice.cartNumber.set(res.numOfCartItems)
      }
    })
  }


  addToWish(id: string): void {
    if (this.wishlistIds.includes(id)) {

      this.wishlistService.removeItemFromWishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds = res.data; 
          this.wishlistService.wishlistNumber.set(res.data.length); 
          this.toastrService.error(res.message);
        }
      });
    } else {
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds = res.data;
          this.wishlistService.wishlistNumber.set(res.data.length);
          this.toastrService.success(res.message); 
        }
      });
    }
  }

}

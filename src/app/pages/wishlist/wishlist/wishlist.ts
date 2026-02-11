import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { WishlistService } from '../../../core/services/wishlistservice/wishlistservice';
import { Cartservice } from '../../../core/services/cartservices/cartservice';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Mytranslate } from '../../../core/services/mytranslate/mytranslate';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink ,TranslatePipe],
  templateUrl: './wishlist.html'
})
export class Wishlist implements OnInit {
  constructor(private mytranslate: Mytranslate) { }  
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(Cartservice);
  private readonly platformId = inject(PLATFORM_ID); 

  wishlistItems: any[] = [];

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('myToken')) {
        this.getWishlist();
      }
    }
  }

  getWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
        this.wishlistService.wishlistNumber.set(res.data.length);
      }
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
        this.wishlistItems = this.wishlistItems.filter(item => item._id !== id);
        this.wishlistService.wishlistNumber.set(res.data.length);
      }
    });
  }

  addToCartFromWish(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
  }
}
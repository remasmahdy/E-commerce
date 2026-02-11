import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core'; // ضفنا PLATFORM_ID
import { CommonModule, isPlatformBrowser } from '@angular/common'; // ضفنا الحماية
import { Products } from '../../core/services/product/products';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Categoriesservices } from '../../core/services/categoryservice/categoriesservices';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Cartservice } from '../../core/services/cartservices/cartservice';
import { WishlistService } from '../../core/services/wishlistservice/wishlistservice';
import { ToastrService } from 'ngx-toastr';
import { Mytranslate } from '../../core/services/mytranslate/mytranslate';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, UpperCasePipe, CurrencyPipe, SearchPipe, FormsModule, TranslatePipe, CommonModule], 
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(private mytranslate: Mytranslate) { }

  private readonly products = inject(Products)
  private readonly categoriesservices = inject(Categoriesservices)
  private readonly cartservice = inject(Cartservice)
  private readonly WishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly platformId = inject(PLATFORM_ID) 

  myProducts: Iproduct[] = []
  myCategories: Icategories[] = []
  wishlistIds: string[] = [];

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 7 }
    },
    nav: true
  }

  mainslider: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  searchItem: string = '';

  ngOnInit(): void {
    this.callProduct();
    this.callCategories();

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('myToken')) {
        this.WishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            this.wishlistIds = res.data.map((item: any) => item._id);
          },
          error: (err) => {
            console.log('Wishlist Error:', err);
          }
        });
      }
    }
  }

  callProduct() {
    this.products.getProducts().subscribe({
      next: (res) => {
        this.myProducts = res.data
      }
    })
  }

  callCategories() {
    this.categoriesservices.getCategories().subscribe({
      next: (res) => {
        this.myCategories = res.data
      }
    })
  }

  addProductToCart(id: string): void {
    this.cartservice.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, ' ');
        this.cartservice.cartNumber.set(res.numOfCartItems)
      }
    })
  }


  addToWish(id: string): void {
    if (this.wishlistIds.includes(id)) {
      this.WishlistService.removeItemFromWishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds = res.data;
          this.WishlistService.wishlistNumber.set(res.data.length);
          this.toastrService.error(res.message);
        }
      });
    } else {
      this.WishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.wishlistIds = res.data;
          this.WishlistService.wishlistNumber.set(res.data.length);
          this.toastrService.success(res.message);
        }
      });
    }
  }
}

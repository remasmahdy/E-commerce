import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { Products } from '../../core/services/product/products'; 
import { Iproduct } from '../../shared/interfaces/iproduct'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Cartservice } from '../../core/services/cartservices/cartservice';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Mytranslate } from '../../core/services/mytranslate/mytranslate';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlistservice/wishlistservice';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, SearchPipe, TranslatePipe], 
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private mytranslate: Mytranslate) {}
    
  private readonly productsService = inject(Products);
  private readonly cartService = inject(Cartservice);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID); 

  productList: Iproduct[] = []; 
  p: number = 1;
  searchItem: string = ''; 
  wishlistIds: string[] = [];

  ngOnInit(): void {
    this.getProductsData();

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

  getProductsData(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => console.log(err)
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
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
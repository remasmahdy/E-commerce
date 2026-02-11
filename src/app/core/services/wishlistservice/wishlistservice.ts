import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);


  wishlistNumber: WritableSignal<number> = signal(0);

  constructor() {

    if (isPlatformBrowser(this.platformId)) {
    }
  }


  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": id
    });
  }


  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }


  removeItemFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }
}

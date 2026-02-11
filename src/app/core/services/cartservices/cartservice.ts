
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {
  
  id= inject(PLATFORM_ID)
  myToken: string| null =null


  
  constructor (private httpClient:HttpClient){
      if(isPlatformBrowser(this.id)){
        this.myToken =localStorage.getItem('myToken')!;
  }
  }
  





  // cartNumber: BehaviorSubject<number>= new BehaviorSubject(0)

  cartNumber : WritableSignal<number> = signal (0)

  addProductToCart(id :string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
    "productId": id
      },

    )
  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart` ,

    )
  }

  removeSpecificItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    )
  }

  updateCartProductQuantity(quantity:any, id:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
    "count": quantity
      },
    )
  }

  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart` ,
    )
  }

}

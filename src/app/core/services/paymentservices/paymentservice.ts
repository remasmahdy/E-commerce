import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Paymentservice {
    id = inject(PLATFORM_ID)
    myToken: string | null = null 
  constructor(private httpClient:HttpClient){
        if (isPlatformBrowser(this.id)){
      this.myToken =localStorage.getItem('myToken')!
    }
  }


  checkOutSession(id:string , shippingData: object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
    "shippingAddress": shippingData
      },
    )

  }
}

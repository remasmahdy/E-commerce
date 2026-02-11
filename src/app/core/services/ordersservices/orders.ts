import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Orders {

  private readonly httpClient = inject(HttpClient);


getuserOrders(id: string): Observable<any> {

  return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
}
}
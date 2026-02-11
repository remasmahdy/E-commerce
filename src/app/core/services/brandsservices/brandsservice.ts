import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Brandsservice {
  private readonly _httpClient = inject(HttpClient);

  getBrands(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

  getSpecificBrand(id: string): Observable<any> {
  return this._httpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`);
}
}
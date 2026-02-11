import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private readonly httpClient:HttpClient  , private router : Router){}

  signup(data:object): Observable<any>{
  return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup` ,data )
  }

  signin(data:object): Observable<any>{
  return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` ,data )
  }

  userData :any ;

  getUserData():void {
    if (isPlatformBrowser(this.id)){
      const token =localStorage.getItem ('myToken') !;
      if (token !==null){
    this.userData =jwtDecode( localStorage.getItem ('myToken') !)
    console.log (this.userData);
      }
    }
    

  }


  id = inject(PLATFORM_ID)
  signOut (){
    if(isPlatformBrowser(this.id)){
      // remove token
      localStorage.removeItem('myToken')
    }
    // remove user data
    this.userData=null

    // login
    this.router.navigate(['/login'])
  }

}

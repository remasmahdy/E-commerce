import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const headerinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const _pLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_pLATFORM_ID)) {
    const token = localStorage.getItem('myToken');
    
    if (token) {
      
      req = req.clone({
        setHeaders: {
          token: token
        }
      });
    }
  }


  return next(req);
};

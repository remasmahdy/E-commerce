import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toastrService = inject (ToastrService)


  return next(req).pipe( catchError ( (err:HttpErrorResponse)=>{
    if(err.status === 0 ){
      toastrService.error('No internet connection');
    }

    if(err.status === 401 ){
      toastrService.error('unauthorized');
    }


    return throwError( ()=>err)
  } ));
};

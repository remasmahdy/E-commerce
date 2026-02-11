import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject (Router)
  const Id =inject (PLATFORM_ID)

  if (!isPlatformBrowser(Id)) {
    return true;
}
  if (isPlatformBrowser(Id)){
        
      if (localStorage.getItem('myToken') !== null){
      return true
          }
        }

          return router.parseUrl('/login')


};

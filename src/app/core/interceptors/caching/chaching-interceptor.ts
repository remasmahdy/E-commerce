import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';


const cache =new Map<string ,{response : HttpResponse <any>;expiry:number}>();
const Cach_Duration = 2*60*10000;
export const chachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method!=='GET') return next(req);
  if (req.url.includes('cart')) return next(req);

  const cachKey = req.urlWithParams;
  const cached = cache.get(cachKey);

  if (cached && cached.expiry>Date.now()){
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event)=>{
      if (event instanceof HttpResponse){
        cache.set(cachKey,{
          response : event.clone(),
          expiry : Date.now() + Cach_Duration,
        })
      }
    })
  );
};

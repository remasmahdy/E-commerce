
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerinterceptorInterceptor } from './core/interceptors/headerinderceptor/headerinterceptor-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import {provideTranslateService, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { chachingInterceptor } from './core/interceptors/caching/chaching-interceptor';


export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'/i18n/','.json');
}



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient( withFetch(), withInterceptors([headerinterceptorInterceptor , errorsInterceptor ,loadingInterceptor,chachingInterceptor]) ),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule , TranslateModule.forRoot( {
      
      loader:{
        provide: TranslateLoader ,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    } )),
    
  ]
};


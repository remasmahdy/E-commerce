import { isPlatformBrowser } from '@angular/common';
import { Inject,Injectable, PLATFORM_ID } from '@angular/core';
import {TranslateService } from '@ngx-translate/core'


@Injectable({
  providedIn: 'root',
})
export class Mytranslate {
  constructor(private translateService:TranslateService , @Inject(PLATFORM_ID) private ID :object){
    if(isPlatformBrowser(ID)){
      //1-set default value 
    this.translateService.setFallbackLang('en')
    //2-get language from localstorage
    let savedLang =localStorage.getItem('myLang')
    //3-use language 
    if (savedLang){
      translateService.use(savedLang )
    }
    this.changeDirection()
  
    }
  }


  changeDirection():void{
    if(isPlatformBrowser(this.ID)){
      const savedLang = localStorage.getItem('myLang');
      if (savedLang === 'en') {
        document.documentElement.setAttribute('dir','ltr')
        document.documentElement.setAttribute('lang','en')

      }
      else if(savedLang =='ar'){
      document.documentElement.setAttribute('dir','rtl')
      document.documentElement.setAttribute('lang','ar')
    }
    }
  }

  changeLang(lang:string):void{
    if (isPlatformBrowser(this.ID)){
    localStorage.setItem('myLang', lang)
    this.changeDirection()    
    }


    this.translateService.use(lang)
    

  }
}


import { Authservice } from './../../core/services/authservice/authservice';
import { Component, computed, inject, input, OnInit, PLATFORM_ID, Signal} from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Mytranslate } from '../../core/services/mytranslate/mytranslate';
import { Cartservice } from '../../core/services/cartservices/cartservice';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../core/services/wishlistservice/wishlistservice';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit{
constructor(private flowbiteService: FlowbiteService, private cartservice :Cartservice,private wishlistService :WishlistService  ,private authservice : Authservice, private mytranslate : Mytranslate , private translateService:TranslateService) {}

pLATFORM_ID = inject (PLATFORM_ID)

numberOfItems:Signal<number>= computed( ()=>this.cartservice.cartNumber() )

numberOfWishlistItems: Signal<number> = computed(() => this.wishlistService.wishlistNumber());

isLoggedIn = input<boolean>(true)

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    
    
    if (isPlatformBrowser(this.pLATFORM_ID)){
      if(localStorage.getItem('myToken')){
            this.cartservice.getLoggedUserCart().subscribe({
      next :(res)=>{
        
        this.cartservice.cartNumber.set(res.numOfCartItems)
      },
      error :(err)=>{
        console.log(err)
      }
    })
          this.wishlistService.getLoggedUserWishlist().subscribe({
  next: (res) => {
    console.log(res)
    this.wishlistService.wishlistNumber.set(res.count);; 
  }
});
  
  }
    }
  }

  signOut(){
  this.authservice.signOut()
  }

  changeLang(lang:string):void{
    this.mytranslate.changeLang(lang)

  }

  currentlang(lang:string):boolean{
    return this.translateService.currentLang===lang;
  }
}

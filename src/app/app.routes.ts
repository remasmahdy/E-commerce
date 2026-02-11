import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { loggedGuard } from './core/guards/looged/logged-guard';


export const routes: Routes = [
    {path:'', redirectTo :'home',pathMatch:'full'},

    {
        path:'', 
        loadComponent: () => import('./layout/blank/blank').then((c) => c.Blank), 
        canActivate : [authGuard],
        title:'blank !',
        children:[
            {path:'home', loadComponent: ()=> import('./pages/home/home').then((c)=>c.Home) ,title:'home !'},
            {path:'cart', loadComponent: ()=> import('./pages/cart/cart').then((c)=>c.Cart) ,title:'cart !'},
            {path:'products', loadComponent: ()=> import('./pages/products/products').then((c)=>c.ProductsComponent) ,title:'products !'},
            {path:'wishlist', loadComponent: ()=> import('./pages/wishlist/wishlist/wishlist').then((c)=>c.Wishlist) ,title:'wishlist !'},
            {path:'categories', loadComponent: ()=> import('./pages/categories/categories').then((c)=>c.Categories)  ,title:'categories !'},
            {path:'brands', loadComponent: ()=> import('./pages/brands/brands').then((c)=>c.Brands) ,title:'brands !'},
            {path:'allorders', loadComponent: ()=> import('./pages/allorders/allorders').then((c)=>c.Allorders) ,title:'allorders !'},
            {path:'checkout/:id', loadComponent: ()=> import('./pages/checkout/checkout').then((c)=>c.Checkout) ,title:'checkout !'},
            {path:'details/:id', loadComponent: ()=> import('./pages/details/details').then((c)=>c.Details) ,title:'Details !'},
        ]
    },

    {
        path:'',
        canActivate:[loggedGuard],
        loadComponent: () => import('./layout/auth/auth').then((c) => c.Auth), 
        title:'auth !',
        children:[
            {path:'login', loadComponent: ()=> import('./pages/login/login').then((c)=>c.Login)  ,title:'login !'},
            {path:'register', loadComponent: ()=> import('./pages/register/register').then((c)=>c.Register)  ,title:'register !'},
            {path:'forgot', loadComponent: ()=> import('./shared/components/ui/forgot/forgot').then((c)=>c.Forgot)  ,title:'forgot !'},
        ]
    },
    
    {path:'**', loadComponent: ()=> import('./pages/not-found/not-found').then((c)=>c.NotFound)  ,title:' NotFound !!!'}
];
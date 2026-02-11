import { Component, inject, PLATFORM_ID } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { Authservice } from '../../core/services/authservice/authservice';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink ,TranslatePipe ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authservice = inject(Authservice)
  private readonly router= inject(Router)
  
  isLoading : boolean =false 
  errorMsg : string =''
  successMsg : string =''




  loginform : FormGroup = new FormGroup ({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    password : new FormControl(null,[Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,100}$/)]),
    } )




  id = inject(PLATFORM_ID)
    submitForm(){
    
    if(this.loginform.valid){

      this.isLoading=true
      this.authservice.signin(this.loginform.value).subscribe( {
      next:(res)=>{
        this.isLoading=false

        if(isPlatformBrowser(this.id)){
          // save token
          localStorage.setItem ( 'myToken', res.token)
                  this.errorMsg=''
        console.log(res);
        
          // decode token
        this.authservice.getUserData()
        this.successMsg=res.message  
          // navigate login
        setTimeout(()=>{
          this.router.navigate(['/home'])
        }, 1000,

        )
      }
        }

,
      error:(err)=>{
        this.isLoading=false
        console.log(err.error.message);
        this.errorMsg =err.error.message
      }
    } )
    }
    else{
      this.loginform.markAllAsTouched()
    }
  }

}

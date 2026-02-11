import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { Authservice } from '../../core/services/authservice/authservice';
import { error } from 'console';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,TranslatePipe],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authservice = inject(Authservice)
  private readonly router= inject(Router)
  
  isLoading : boolean =false 
  errorMsg : string =''
  successMsg : string =''




  registerform : FormGroup = new FormGroup ({
    name : new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email : new FormControl(null ,[Validators.required , Validators.email]),
    password : new FormControl(null,[Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{6,100}$/)]),
    rePassword : new FormControl(null,[Validators.required]),
    phone : new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators : this.confirmPassword})


  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value
    
    if(password === rePassword){
      return null 
    }else{
      return {mismatch:true}
    }
  }



  submitForm(){
    
    if(this.registerform.valid){

      this.isLoading=true
      this.authservice.signup(this.registerform.value).subscribe( {
      next:(res)=>{
        this.isLoading=false
        this.errorMsg=''
        console.log(res);
        this.successMsg=res.message
        setTimeout(()=>{
          this.router.navigate(['/login'])
        }, 1000,

        )
      },
      error:(err)=>{
        this.isLoading=false
        console.log(err.error.message);
        this.errorMsg =err.error.message
      }
    } )
    }
    else{
      this.registerform.markAllAsTouched()
    }
  }
}

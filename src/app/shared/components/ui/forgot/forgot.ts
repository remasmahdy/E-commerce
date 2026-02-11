import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Forgotservice } from '../../../../core/services/forgotServices/forgotservice';
import { Authservice } from '../../../../core/services/authservice/authservice';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule ],
  templateUrl: './forgot.html',
  styleUrl: './forgot.scss',
})
export class Forgot {


  step :number =1 

  private readonly forgotservice = inject (Forgotservice)
  private readonly authservice = inject (Authservice)
  private readonly router = inject (Router)



  forgotpassForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required])
  })

  verifyCodeForm : FormGroup = new FormGroup({
    resetCode : new FormControl(null , [Validators.required])
  })

  resetPassForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required]),
    newPassword : new FormControl(null , [Validators.required])
  })

  forgotpass(){

    let emailValue = this.forgotpassForm.get('email')?.value
    this.resetPassForm.get('email')?.patchValue(emailValue)



    this.forgotservice.forgotPass(this.forgotpassForm.value).subscribe({
      next: (res)=>{
        console.log(res)
        if(res.statusMsg== 'success'){
          this.step=2
        }

      },
      error: (err)=>[

      ]
    })
  }

  verifycode(){
    this.forgotservice.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res)=>{
        if(res.status== 'Success'){
          this.step=3
        }

      },
      error: (err)=>[

      ]
    })
  }
  
  id = inject(PLATFORM_ID)
  resetpass(){
    this.forgotservice.resetPass(this.resetPassForm.value).subscribe({
      next: (res)=>{
        if(isPlatformBrowser(this.id)){
          localStorage.setItem ( 'myToken', res.token)
        }
          
          // decode token
        this.authservice.getUserData()
          
          // navigate login
        setTimeout(()=>{
          this.router.navigate(['/home'])
        }, 1000);

      },
      error: (err)=>[
      ]
    })
  }

  


}

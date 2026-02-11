import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paymentservice } from '../../core/services/paymentservices/paymentservice';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit{

  private readonly FormBuilder=inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly paymentservice=inject(Paymentservice)


  paymentform !:FormGroup ;

  cartId : string =''


  ngOnInit():void{
    this.paymentform= this.FormBuilder.group({
      details :[null , [Validators.required]],
      phone :[null ,  [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city :[null , [Validators.required]],
    })

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
          this.cartId = res.get('id')!
      }

    })

  }




  submitForm():void{
    console.log(this.paymentform.value)

    this.paymentservice.checkOutSession(this.cartId, this.paymentform.value).subscribe({
      next:(res)=>{
          console.log(res);
          if(res.status === "success"){
            window.open(res.session.url ,'_self')
          }
      }
    })
  }

}

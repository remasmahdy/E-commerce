import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core'; 
import { Orders } from '../../core/services/ordersservices/orders';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss'
})
export class Allorders implements OnInit {
  private readonly ordersService = inject(Orders);
  private readonly idPlatform = inject(PLATFORM_ID); 
  
  allOrders: any[] = [];

  ngOnInit(): void {

    if (isPlatformBrowser(this.idPlatform)) {
      this.callOrders();
    }
  }

  callOrders(): void {
    const token = localStorage.getItem('myToken');

    if (token) {
    
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      this.ordersService.getuserOrders(userId).subscribe({
        next: (res) => {
          this.allOrders = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
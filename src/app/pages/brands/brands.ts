import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core'; 
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Brandsservice } from '../../core/services/brandsservices/brandsservice';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {
  private readonly brandsservice = inject(Brandsservice);
  private readonly platformId = inject(PLATFORM_ID);

  brandsList: Ibrands[] = []; 

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.getBrandsData();
    }
  }

  getBrandsData(): void {
    this.brandsservice.getBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  brandDetails: any = null;

  openModal(id: string): void {
    this.brandsservice.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandDetails = res.data;
      }
    });
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoriesservices } from '../../core/services/categoryservice/categoriesservices'; 
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  private readonly _categoriesService = inject(Categoriesservices); 
  
  categoriesList: Icategories[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => console.log(err)
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[])=>{
      this.products = data.map(product => ({
        ...product,
        categoryClass: product.category.toLowerCase().replace(/[^a-z0-9]/g, '')
      }
      ));
    })  
    }
}

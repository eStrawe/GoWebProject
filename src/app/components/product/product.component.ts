import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  originalPrice: number | null = null; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((data: Product) => {
        this.product = {
          ...data,
          categoryClass: data.category.toLowerCase().replace(/[^a-z0-9]/g, '') // We remove special characters so that it fits with one of the css categories class
        };
        this.originalPrice = this.product.price; // To know if price was modified in the forms
      });
  }
  else {
    console.error('Product ID is null');
  }
  }

  updateProduct() {
    if (this.product) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(updatedProduct => {
        this.product = updatedProduct;
        this.originalPrice = this.product.price;
        alert('Product updated successfully!');
      });
    }
  }

  priceChanged() {
    return this.product && this.product.price !== this.originalPrice;
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      map((data: any[]) => {
        if (!data) {
          throw new Error('No data received from API');
        }
        return data.map(item => ({
          ...item,
          categoryClass: item.category.toLowerCase().replace(/[^a-z0-9]/g, '')
        }));
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      map((data: any) => {
        if (!data) {
          throw new Error('No data received from API');
        }
        return {
          ...data,
          categoryClass: data.category.toLowerCase().replace(/[^a-z0-9]/g, '')
        };
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product).pipe(
      map((data: any) => {
        if (!data) {
          throw new Error('No data received from API');
        }
        return {
          ...data,
          categoryClass: data.category.toLowerCase().replace(/[^a-z0-9]/g, '')
        };
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
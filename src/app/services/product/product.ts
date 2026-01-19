import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string; // API usually returns _id
  code?: string;
  productName: string;
  price: number;
  stock: number;
  category_id?: string;
}

@Injectable({
  providedIn: 'root',
})  
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/sku_masters'; 

  constructor() { }

  // GET /sku_masters - ดึงสินค้าทั้งหมด
  getProducts(): Observable<Product[]> {
    const timestamp = new Date().getTime();
    return this.http.get<Product[]>(`${this.apiUrl}?t=${timestamp}`);
  }

  // GET /sku_masters/:id - ดูสินค้า
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // GET /sku_masters/search?keyword= - ค้นหาสินค้า
  searchProducts(keyword: string): Observable<Product[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

  // GET /sku_masters/by_category?category_id= - กรองตามหมวด
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    const params = new HttpParams().set('category_id', categoryId);
    return this.http.get<Product[]>(`${this.apiUrl}/by_category`, { params });
  }

  // POST /sku_masters - เพิ่มสินค้า
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // PATCH /sku_masters/:id - แก้ไขสินค้า
  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  // DELETE /sku_masters/:id - ลบสินค้า
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

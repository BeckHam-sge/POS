import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  constructor (private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('/categories');
  }

  addCategories(categories: any): Observable<any> {
    const payload = { categories: categories };
    return this.http.post<any>('/categories', payload);
  }

  updateCategories(id: number, categories: any): Observable<any> {
    const payload = { categories: categories };
    return this.http.patch<any>(`/categories/${id}`, payload);
  }

  deleteCategories(id: number): Observable<any> {
    const payload = { id: id };
    return this.http.delete<any>(`/categories/${id}`, );
  }
}

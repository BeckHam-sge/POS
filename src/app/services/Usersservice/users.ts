import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface Role {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http!: HttpClient;
  private apiUrl = '/users';

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  addUser(user: any): Observable<any> {
    const payload = { user: user };
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateUser(id: number, user: User): Observable<User> {
    const payload = { user: user };
    return this.http.patch<User>(`${this.apiUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }




}

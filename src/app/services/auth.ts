import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root',})

export class AuthService {
  private http = inject(HttpClient)
  private readonly apiUrl = 'https://apipos-production.up.railway.app';

login(credentials: any): Observable<any> {

    return this.http.post(`/login`, credentials).pipe(
      tap((res: any) => {

        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }


}

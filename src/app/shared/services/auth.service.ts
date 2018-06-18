import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

@Injectable()
export class AuthService {

  private TOKEN_KEY: string = 'token';
  private path:string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getLoggedinUser() {
    return this.http.get(this.path + '/loggedin_user', {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
    })
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.path + '/signup', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(user: User): Observable<any> {
    return this.http.post(this.path + '/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

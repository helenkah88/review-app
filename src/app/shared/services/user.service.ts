import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class UserService {

  private path:string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.path + '/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getSingle(id: string): Observable<any> {
    return this.http.get(this.path + '/users/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getOwner(id: string): Observable<any> {
    return this.http.get(this.path + '/profile/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateUser(id: string, user): Observable<any> {
    return this.http.put(this.path + '/profile/' + id, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.path + '/profile/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

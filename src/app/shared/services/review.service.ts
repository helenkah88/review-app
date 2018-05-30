import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ReviewService {

  private path: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.path + '/reviews', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getSingle(id: string): Observable<any> {
    return this.http.get(this.path + '/review/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getSingleByOwner(id: string): Observable<any> {
    return this.http.get(this.path + '/profile/review/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveReview(review): Observable<any> {
    return this.http.post(this.path + '/profile/review', review);
  }

  updateReview(id: string, review): Observable<any> {
    return this.http.put(this.path + '/profile/review/' + id, review);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(this.path + '/profile/review/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteReviewImg(id: string, imgId: string): Observable<any> {
    return this.http.delete(this.path + '/profile/review/' + id + '/' + imgId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

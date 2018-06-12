import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppState } from '../../store/models/app.state';
import { selectReviews } from '../../store/reducers/core.reducer';
import { Review } from '../../models/review';
import { GET_REVIEWS } from '../../store/actions/reviews.actions';

@Component({
  selector: 'review-app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass']
})
export class ReviewPageComponent implements OnInit {

  review: Review;
  slideImgs: string[] = [];
  places: string[] = [];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {

    this.store.dispatch({type: GET_REVIEWS});

    let id = this.route.snapshot.params.reviewId;
    this.store.pipe(
      select(selectReviews),
      map(reviews => reviews)
    )
    .subscribe(reviews => {
        this.review = reviews.filter(review => review._id === id)[0];
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';

import { User } from '../../models/user';
import { Review } from '../../models/review';
import { GET_REVIEWS, DELETE_REVIEW } from '../../store/actions/reviews.actions';
import { selectReviewsByOwner, selectLoggedinUser } from '../../store/reducers/core.reducer';

@Component({
  selector: 'review-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  reviews$: Observable<Review[]>;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.store.dispatch({type: GET_REVIEWS});
  }

  ngOnInit() {
    this.reviews$ = this.store.pipe(
      select(selectReviewsByOwner)
    );

    this.store.pipe(
      select(selectLoggedinUser)
    )
    .subscribe(user => this.user = user);
  }

  deleteReview(id) {
    this.store.dispatch({type: DELETE_REVIEW, payload: id})
  }

}

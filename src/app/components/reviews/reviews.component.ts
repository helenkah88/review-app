import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as reviewsActions from '../../store/actions/reviews.actions';
import * as usersActions from '../../store/actions/users.actions';
import * as fromReviews from '../../store/reducers';
import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../models/review';
import { User } from '../../models/user';
import { AppState } from '../../store/models/app.state';
import { selectUsers, selectReviews } from '../../store/reducers/core.reducer';

@Component({
  selector: 'review-app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {

  reviews$: Observable<Review[]>;
  users$: Observable<User[]>;

  constructor(private reviewService: ReviewService, private store: Store<AppState>) {}

  reviews: Review[];
  slideImgs: string[] = [];
  places: any[] = [];

  ngOnInit() {
    this.reviews$ = this.store.select(selectReviews);
    this.users$ = this.store.select(selectUsers);

    this.store.dispatch({type: reviewsActions.GET_REVIEWS});
    this.store.dispatch({type: usersActions.GET_USERS});
  }

}

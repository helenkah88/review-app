import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as actions from '../../store/actions/reviews.actions'; 
import * as fromReviews from '../../store/reducers'; 
import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../models/review';
import { AppState } from '../../store/models/app.state';

@Component({
  selector: 'review-app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {

  reviews$: Observable<Review[]>;

  constructor(private reviewService: ReviewService, private store: Store<AppState>) {}

  reviews: Review[];
  slideImgs: string[] = [];
  places: any[] = [];

  ngOnInit() {
    this.reviews$ = this.store.select(state => state.reviews.reviews);
    
    this.store.dispatch({type: actions.GET_REVIEWS});
  }

}

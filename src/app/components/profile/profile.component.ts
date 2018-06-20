import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';

import { ReviewService } from '../../shared/services/review.service';
import { User } from '../../models/user';
import { Review } from '../../models/review';
import { GET_REVIEWS } from '../../store/actions/reviews.actions';
import { selectReviewsByOwner, selectLoggedinUser } from '../../store/reducers/core.reducer';

@Component({
  selector: 'review-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  reviews$: Observable<Review[]>;
  userId: string;

  constructor(
    private reviewService: ReviewService,
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
    .subscribe(userId => this.userId = userId)
    /*let id = this.route.snapshot.params.userId;
    this.userService.getOwner(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })*/
  }
/*
  deleteReview(id) {
    this.reviewService.deleteReview(id)
    .subscribe(response => {
        this.user.reviews = this.user.reviews.filter(item => {
          return item._id !== id;
        })
    })
  }*/

  /*saveSettings() {

  }*/

}

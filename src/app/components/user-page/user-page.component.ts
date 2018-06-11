import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { User } from '../../models/user';
import { Review } from '../../models/review';
import { selectReviewsByUser, selectCurrentUser, selectReviews } from '../../store/reducers/core.reducer';
import * as reviewsActions from '../../store/actions/reviews.actions';

import { map } from 'rxjs/operators';

@Component({
  selector: 'review-app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit {

  user: any;
  reviews$: Observable<Review[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(1);
    this.store.pipe(
      select(selectCurrentUser),
      map(user => {
        console.log(user);
        return user;
      })
    ).subscribe((user) => {
      this.user = user;
    })
    
    this.reviews$ = this.store.pipe(
      select(selectReviewsByUser)
    );
/*
    this.reviews$ = this.store.pipe(
      select(selectReviews)
    );*/

    // this.store.dispatch({type: reviewsActions.GET_REVIEWS});

    /*let id = this.route.snapshot.params.userId;
    this.userService.getSingle(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })*/
  }
}

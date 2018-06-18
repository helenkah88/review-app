import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../../store/models/app.state';
import * as actions from '../../store/actions/users.actions';

import { User } from '../../models/user';
import { Review } from '../../models/review';
import * as fromCoreReducers from '../../store/reducers/core.reducer';
import * as reviewsActions from '../../store/actions/reviews.actions';

@Component({
  selector: 'review-app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit {

  user: any;
  reviews: Review[];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.store.dispatch({type: actions.GET_USERS});

    let id = this.route.snapshot.params.userId;
    this.store.pipe(
      select(fromCoreReducers.selectUsers),
      map(users => users.filter(user => user._id === id))
    )
    .subscribe(user => {
      if(user) {
        this.user = user[0];
        this.store.pipe(
          select(fromCoreReducers.selectReviews),
          map(reviews => reviews)
        )
        .subscribe(reviews => {
          this.reviews = reviews.filter(review => review.user._id === this.user._id)
        })
      }
    })
    /*this.store.pipe(
      select(selectCurrentUser),
      map(user => {
        console.log(user);
        return user;
      })
    ).subscribe((user) => {
      this.user = user;
    })*/
    
    /*this.reviews$ = this.store.pipe(
      select(selectReviewsByUser)
    );*/
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

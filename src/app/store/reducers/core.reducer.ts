import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReviews from './reviews.reducers';
import * as fromUsers from './users.reducers';
import * as fromAuth from './auth.reducers';
import { AppState } from '../models/app.state';
import { ReviewsState } from '../models/reviews.state';

export const reducers: ActionReducerMap<AppState> = {
  reviews: fromReviews.reviewsReducer,
  users: fromUsers.usersReducer,
  currentUser: fromAuth.currentUserReducer
};

export const selectFeature = createFeatureSelector<ReviewsState>('reviews');
export const selectReviews = createSelector(selectFeature, (state: ReviewsState) => state.reviews);
/*
export const selectReviews = createSelector(
  (state: AppState) => state.reviews,
  fromReviews.getReviews
);*/

export const selectUsers = createSelector(
	(state: AppState) => state.users,
	fromUsers.getUsers
);

export const selectCurrentUser = createSelector(
	(state: AppState) => state.currentUser,
	fromAuth.getCurrentUser
);

export const selectReviewsByOwner = createSelector(
	selectCurrentUser,
	selectReviews,
	(currentUser, reviews) => {
		if(currentUser && reviews) {
			let res = reviews.filter(review => currentUser === review.user._id);
			console.log(currentUser, reviews, res);
			return res;
		}
	}
)
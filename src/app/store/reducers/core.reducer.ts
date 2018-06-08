import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReviews from './reviews.reducers';
import * as fromUsers from './users.reducers';
import { AppState } from '../models/app.state';
import { ReviewsState } from '../models/reviews.state';

export const reducers: ActionReducerMap<AppState> = {
  reviews: fromReviews.reviewsReducer,
  users: fromUsers.usersReducer,
  currentUser: fromUsers.currentUserReducer
};
/*
export const selectFeature = createFeatureSelector<ReviewsState>('reviews');
export const selectReviews = createSelector(selectFeature, (state: ReviewsState) => state.reviews);*/

export const selectReviews = createSelector(
  (state: AppState) => state.reviews,
  fromReviews.getReviews
);

export const selectUsers = createSelector(
	(state: AppState) => state.users,
	fromUsers.getUsers
);

export const currentUser = createSelector((state: AppState) => state.currentUser, fromUsers.getCurrentUser);
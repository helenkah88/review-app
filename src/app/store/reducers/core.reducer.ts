import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromReviews from './reviews.reducers';
import { AppState } from '../models/app.state';

export const reducers: ActionReducerMap<AppState> = {
  reviews: fromReviews.reviewsReducer
};

export const selectReviews = createSelector(
  (state: AppState) => state.reviews,
  fromReviews.getReviews
)

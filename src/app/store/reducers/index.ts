import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromReviews from './reviews.reducers';
import { Review } from '../../models/review';
import { AppState } from '../models/app.state';
import { ReviewsState } from '../models/reviews.state';

// export const reviews = (state: ReviewsState) => state.reviews;

// export const selectReviews = createSelector(fromReviews.getReviews, (reviews: Review[]) => {
// 	console.log(reviews);
// 	return reviews;
// })

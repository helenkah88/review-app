import { ActionReducerMap } from '@ngrx/store';
import * as fromReviews from './reviews.reducers';
import { ReviewsState } from '../models/reviews.state';
import { AppState } from '../models/app.state';

export const reducers: ActionReducerMap<AppState> = {
	reviews: fromReviews.reviewsReducer
}


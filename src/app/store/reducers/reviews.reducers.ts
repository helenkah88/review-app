import { Action } from '@ngrx/store';
import * as actions from '../actions/reviews.actions';
import { ReviewsState } from '../models/reviews.state';

export const initialState: ReviewsState = {
	reviews: [],
	loading: false,
	loaded: false
}

export function reviewsReducer(state = initialState, action: actions.ReviewsAction) {
	switch (action.type) {
		case actions.GET_REVIEWS:
			return {
				...state,
				loading: true
			}
		case actions.GET_REVIEWS_SUCCESS:
			return {
				...state,
				reviews: action.payload,
				loading: false,
				loaded: true
			}
		case actions.GET_REVIEWS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			}

		default:
			return state;
	}
}

export const getReviews = (state: ReviewsState) => {
	// console.log(state.reviews);
	return state.reviews;
}

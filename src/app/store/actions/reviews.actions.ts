import { Action } from '@ngrx/store';

import { Review } from '../../models/review';

export const GET_REVIEWS = '[Reviews] Get Reviews';
export const GET_REVIEWS_SUCCESS = '[Reviews] Get Reviews Success';
export const GET_REVIEWS_FAIL = '[Reviews] Get Reviews Fail';

export class GetReviews implements Action {
	readonly type = GET_REVIEWS;
}

export class GetReviewsSuccess implements Action {
	readonly type = GET_REVIEWS_SUCCESS;
	constructor(public payload: Review[]) {}
}
export class GetReviewsFail implements Action {
	readonly type = GET_REVIEWS_FAIL;
	constructor(payload: any) {}
}

export type ReviewsAction = GetReviews | GetReviewsSuccess | GetReviewsFail;
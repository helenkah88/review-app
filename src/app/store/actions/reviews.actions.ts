import { Action } from '@ngrx/store';

import { Review } from '../../models/review';

export const GET_REVIEWS = '[Reviews] Get Reviews';
export const GET_REVIEWS_SUCCESS = '[Reviews] Get Reviews Success';
export const GET_REVIEWS_FAIL = '[Reviews] Get Reviews Fail';

export const SAVE_REVIEW = '[Reviews] Save Review';
export const SAVE_REVIEW_SUCCESS = '[Reviews] Save Review Success';
export const SAVE_REVIEW_FAIL = '[Reviews] Save Review Fail';

export const UPDATE_REVIEW = '[Reviews] Update Review';
export const UPDATE_REVIEW_SUCCESS = '[Reviews] Update Review Success';
export const UPDATE_REVIEW_FAIL = '[Reviews] Update Review Fail';

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

export class SaveReview implements Action {
	readonly type = SAVE_REVIEW;
	constructor(public payload: Review) {}
}

export class SaveReviewSuccess implements Action {
	readonly type = SAVE_REVIEW_SUCCESS;
	constructor(public payload: any) {}
}
export class SaveReviewFail implements Action {
	readonly type = SAVE_REVIEW_FAIL;
	constructor(payload: any) {}
}

export class UpdateReview implements Action {
	readonly type = UPDATE_REVIEW;
	constructor(public payload: any) {}
}

export class UpdateReviewSuccess implements Action {
	readonly type = UPDATE_REVIEW_SUCCESS;
	constructor(public payload: Review[]) {}
}
export class UpdateReviewFail implements Action {
	readonly type = UPDATE_REVIEW_FAIL;
	constructor(payload: any) {}
}

export type ReviewsAction = GetReviews
 | GetReviewsSuccess
 | GetReviewsFail
 | SaveReview
 | SaveReviewSuccess
 | SaveReviewFail
 | UpdateReview
 | UpdateReviewSuccess
 | UpdateReviewFail
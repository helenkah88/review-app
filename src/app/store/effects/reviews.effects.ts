import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as actions from '../actions/reviews.actions';
import { ReviewService } from '../../shared/services/review.service';

@Injectable()
export class ReviewsEffects {
	constructor(private actions$: Actions, private reviewService: ReviewService) {}

	@Effect()
	reviews$ = this.actions$.ofType(actions.GET_REVIEWS)
	.switchMap(() => {
		return this.reviewService.getAll()
			.map(response => new actions.GetReviewsSuccess(response.data))
	});

	@Effect()
	newReview$ = this.actions$.ofType(actions.SAVE_REVIEW)
	.map((action: actions.SaveReview) => action.payload)
	.switchMap(payload => {
		return this.reviewService.saveReview(payload)
			.map(response => new actions.SaveReviewSuccess(response.data))
	});

	@Effect()
	updatedReview$ = this.actions$.ofType(actions.UPDATE_REVIEW)
	.map((action: actions.UpdateReview) => action.payload)
	.switchMap(payload => {
		return this.reviewService.updateReview(payload.id, payload.data)
			.map(response => new actions.UpdateReviewSuccess(response.data))
	});
}
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
				.map(response => {
					console.log(response.data);
					return new actions.GetReviewsSuccess(response.data)
				})
		})
}
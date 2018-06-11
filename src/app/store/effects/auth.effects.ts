import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as actions from '../actions/auth.actions';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
	constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

	@Effect()
	currentUser$ = this.actions$.ofType(actions.SIGNUP)
		.map((action: actions.Sign) => {
			return action.payload;
		})
		.switchMap((payload) => {
			return this.authService.signup(payload)
				.map(response => {
					this.authService.saveToken(response.data.token);
					this.router.navigate(['/profile', response.data._id]);
					return new actions.SignSuccess(response.data);
				});
		})
}
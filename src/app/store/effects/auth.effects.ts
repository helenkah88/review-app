import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/auth.actions';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
	constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

	@Effect()
	loggedUser = this.actions$.ofType(actions.LOGIN)
	.pipe(
		map((action: actions.Login) => {
			return action.payload;
		}),
		switchMap((payload) => {
			return this.authService.login(payload)
				.map(response => {
					this.authService.saveToken(response.token);
					console.log(response);
					this.router.navigate(['/profile', response.data._id]);
					return new actions.LoginSuccess(response.data);
				});
		})
	);

	@Effect()
	initialUser = this.actions$.ofType(actions.GET_LOGGEDIN_USER)
	.pipe(
		switchMap(() => {
			return this.authService.getLoggedinUser()
			.map(response => {
				console.log(response, response.data);
				return new actions.GetLoggedinUserSuccess(response.data);
			})
		})	
	)

	@Effect()
	currentUser = this.actions$.ofType(actions.SIGNUP)
	.pipe(
		map((action: actions.Signup) => {
			return action.payload;
		}),
		switchMap((payload) => {
			return this.authService.signup(payload)
				.map(response => {
					this.authService.saveToken(response.token);
					this.router.navigate(['/profile', response.data._id]);
					return new actions.SignupSuccess(response.data);
				});
		})
	);
}
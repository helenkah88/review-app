import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as actions from '../actions/users.actions';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UsersEffects {
	constructor(
		private actions$: Actions,
		private router: Router,
		private userService: UserService
	) {}

	@Effect()
	users$ = this.actions$.ofType(actions.GET_USERS)
	.switchMap(() => {
		return this.userService.getAll()
			.map(response => new actions.GetUsersSuccess(response.data));
	});

	@Effect()
	updatedUser$ = this.actions$.ofType(actions.UPDATE_USER)
	.map((action: actions.UpdateUser) => action.payload)
	.switchMap(payload => {
		return this.userService.updateUser(payload)
			.map(response => {
				console.log(response.data, response.data._id);
				this.router.navigate(['/profile', response.data._id]);
				return new actions.UpdateUserSuccess(response.data);
			});
	});

	@Effect()
	deletedUser$ = this.actions$.ofType(actions.DELETE_USER)
	.map((action: actions.DeleteUser) => action.payload)
	.switchMap(payload => {
		return this.userService.deleteUser(payload)
			.map(response => {
				this.router.navigate(['/']);
				return new actions.DeleteUserSuccess(response._id);
			});
	});
}
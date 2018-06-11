import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as actions from '../actions/users.actions';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UsersEffects {
	constructor(private actions$: Actions, private userService: UserService) {}

	@Effect()
	users$ = this.actions$.ofType(actions.GET_USERS)
		.switchMap(() => {
			return this.userService.getAll()
				.map(response => new actions.GetUsersSuccess(response.data));
		})
}
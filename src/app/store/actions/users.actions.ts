import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const GET_USERS = '[Users] Get Users';
export const GET_USERS_SUCCESS = '[Users] Get Users Success';
export const GET_USERS_FAIL = '[Users] Get Users Fail';

export class GetUsers implements Action {
	readonly type = GET_USERS;
}

export class GetUsersSuccess implements Action {
	readonly type = GET_USERS_SUCCESS;
	constructor(public payload: any[]) {}
}
export class GetUsersFail implements Action {
	readonly type = GET_USERS_FAIL;
	constructor(payload: any) {}
}

export type UsersAction = GetUsers
 | GetUsersSuccess
 | GetUsersFail
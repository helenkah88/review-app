import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const GET_USERS = '[Users] Get Users';
export const GET_USERS_SUCCESS = '[Users] Get Users Success';
export const GET_USERS_FAIL = '[Users] Get Users Fail';

export const SIGNUP = '[Users] Sign Up';
export const SIGNUP_SUCCESS = '[Users] Sign Up Success';
export const SIGNUP_FAIL = '[Users] Sign Up Fail';

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

export class Sign implements Action {
	readonly type = SIGNUP;
	constructor(public payload: User) {}
}

export class SignSuccess implements Action {
	readonly type = SIGNUP_SUCCESS;
}

export class SignFail implements Action {
	readonly type = SIGNUP_FAIL;
	constructor(payload: any) {}
}

export type UsersAction = GetUsers
 | GetUsersSuccess
 | GetUsersFail
 | Sign
 | SignSuccess
 | SignFail
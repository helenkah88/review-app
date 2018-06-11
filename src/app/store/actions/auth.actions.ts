import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const SIGNUP = '[Users] Sign Up';
export const SIGNUP_SUCCESS = '[Users] Sign Up Success';
export const SIGNUP_FAIL = '[Users] Sign Up Fail';

export class Sign implements Action {
	readonly type = SIGNUP;
	constructor(public payload: User) {}
}

export class SignSuccess implements Action {
	readonly type = SIGNUP_SUCCESS;
	constructor(public payload: any) {}
}

export class SignFail implements Action {
	readonly type = SIGNUP_FAIL;
	constructor(public payload: any) {}
}

export type UsersAction = Sign
 | SignSuccess
 | SignFail
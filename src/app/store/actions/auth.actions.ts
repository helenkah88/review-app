import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const SIGNUP = '[Users] Sign Up';
export const SIGNUP_SUCCESS = '[Users] Sign Up Success';
export const SIGNUP_FAIL = '[Users] Sign Up Fail';

export const LOGIN = '[Users] Login';
export const LOGIN_SUCCESS = '[Users] Login Success';
export const LOGIN_FAIL = '[Users] Login Fail';

export const GET_LOGGEDIN_USER = '[Users] Get Loggedin User';
export const GET_LOGGEDIN_USER_SUCCESS = '[Users] Get Loggedin User Success';
export const GET_LOGGEDIN_USER_FAIL = '[Users] Get Loggedin User Fail';

export class Signup implements Action {
	readonly type = LOGIN;
	constructor(public payload: User) {}
}

export class SignupSuccess implements Action {
	readonly type = SIGNUP_SUCCESS;
	constructor(public payload: any) {}
}

export class SignupFail implements Action {
	readonly type = SIGNUP_FAIL;
	constructor(public payload: any) {}
}

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: User) {}
}

export class LoginSuccess implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor(public payload: any) {}
}

export class LoginFail implements Action {
	readonly type = LOGIN_FAIL;
	constructor(public payload: any) {}
}

export class GetLoggedinUser implements Action {
	readonly type = GET_LOGGEDIN_USER;
}

export class GetLoggedinUserSuccess implements Action {
	readonly type = GET_LOGGEDIN_USER_SUCCESS;
	constructor(public payload: any) {}
}

export class GetLoggedinUserFail implements Action {
	readonly type = GET_LOGGEDIN_USER_FAIL;
	constructor(public payload: any) {}
}

export type UsersAction = Signup
 | SignupSuccess
 | SignupFail
 | Login
 | LoginSuccess
 | LoginFail
 | GetLoggedinUser
 | GetLoggedinUserSuccess
 | GetLoggedinUserFail
 
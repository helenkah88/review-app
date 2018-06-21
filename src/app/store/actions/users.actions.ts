import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const GET_USERS = '[Users] Get Users';
export const GET_USERS_SUCCESS = '[Users] Get Users Success';
export const GET_USERS_FAIL = '[Users] Get Users Fail';

export const UPDATE_USER = '[Users] Update User';
export const UPDATE_USER_SUCCESS = '[Users] Update User Success';
export const UPDATE_USER_FAIL = '[Users] Update User Fail';

export const DELETE_USER = '[Users] Delete User';
export const DELETE_USER_SUCCESS = '[Users] Delete User Success';
export const DELETE_USER_FAIL = '[Users] Delete User Fail';

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

export class UpdateUser implements Action {
	readonly type = UPDATE_USER;
	constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
	readonly type = UPDATE_USER_SUCCESS;
	constructor(public payload: any) {}
}
export class UpdateUserFail implements Action {
	readonly type = UPDATE_USER_FAIL;
	constructor(payload: any) {}
}

export class DeleteUser implements Action {
	readonly type = DELETE_USER;
	constructor(public payload: string) {}
}

export class DeleteUserSuccess implements Action {
	readonly type = DELETE_USER_SUCCESS;
	constructor(public payload: any) {}
}
export class DeleteUserFail implements Action {
	readonly type = DELETE_USER_FAIL;
	constructor(payload: any) {}
}

export type UsersAction = GetUsers
 | GetUsersSuccess
 | GetUsersFail
 | UpdateUser
 | UpdateUserSuccess
 | UpdateUserFail
 | DeleteUser
 | DeleteUserSuccess
 | DeleteUserFail
import { Action } from '@ngrx/store';
import * as actions from '../actions/users.actions';
import { UsersState } from '../models/users.state';
import { currentUserState } from '../models/currentUser.state';

export const allUsersState: UsersState = {
	users: [],
	loading: false,
	loaded: false
}

export const currentUser: currentUserState = {
	username: '',
	id: ''
}

export function usersReducer(state = allUsersState, action: actions.UsersAction) {
	switch (action.type) {
		case actions.GET_USERS_SUCCESS:
			return {
				...state,
				reviews: action.payload,
				loading: false,
				loaded: true
			}
		case actions.GET_USERS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			}

		default:
			return state;
	}
}

export function currentUserReducer(state = currentUser, action: actions.UsersAction) {
	switch (action.type) {
		case actions.SIGNUP:
			return {
				...state,
				currentUser: action.payload
			}
		default:
			return state;
	}
}

export const getUsers = (state: UsersState) => {
	console.log(state.users);
	return state.users
}

export const getCurrentUser = (state: currentUserState) => state.id;
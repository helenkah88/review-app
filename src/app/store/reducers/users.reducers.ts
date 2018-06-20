import { Action } from '@ngrx/store';
import * as actions from '../actions/users.actions';
import { UsersState } from '../models/users.state';

export const allUsersState: UsersState = {
	users: [],
	loading: false,
	loaded: false
}

export function usersReducer(state = allUsersState, action: actions.UsersAction) {
	switch (action.type) {
		case actions.GET_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
				loading: false,
				loaded: true
			}
		case actions.GET_USERS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			}
		case actions.UPDATE_USER_SUCCESS:
			let users = [...state.users, action.payload];
			return {
				...state,
				users
			}

		default:
			return state;
	}
}

export const getUsers = (state: UsersState) => state.users;
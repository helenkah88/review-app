import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import { currentUserState } from '../models/currentUser.state';

export const currentUser: currentUserState = {
	username: '',
	id: ''
}

export function currentUserReducer(state = currentUser, action: actions.UsersAction) {
	switch (action.type) {
		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				id: action.payload._id
			}
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				id: action.payload._id
			}
		default:
			return state;
	}
}

export const getCurrentUser = (state: currentUserState) => state.id;
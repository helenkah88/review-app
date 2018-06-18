import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import { loggedinUserState } from '../models/currentUser.state';

export const loggedinUser: loggedinUserState = {
	username: '',
	id: ''
}

export function loggedinUserReducer(state = loggedinUser, action: actions.UsersAction) {
	switch (action.type) {
		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				id: action.payload._id
			}
		case actions.LOGIN_SUCCESS:
		case actions.GET_LOGGEDIN_USER_SUCCESS:
			return {
				...state,
				// username: action.payload.username,
				id: action.payload._id
			}
		default:
			return state;
	}
}

export const getLoggedinUserId = (state: loggedinUserState) => state.id;
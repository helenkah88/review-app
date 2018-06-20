import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import { loggedinUserState } from '../models/currentUser.state';

export const loggedinUser: loggedinUserState = {
	id: '',
	data: {}
}

export function loggedinUserReducer(state = loggedinUser, action: actions.UsersAction) {
	let payload = action.payload;
	switch (action.type) {
		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				id: payload._id,
				data: {
					username: payload.username,
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email 
				}
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
export const getLoggedinUser = (state: loggedinUserState) => state.data;
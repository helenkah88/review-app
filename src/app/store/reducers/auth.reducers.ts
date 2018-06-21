import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import { loggedinUserState } from '../models/currentUser.state';

export const loggedinUser: loggedinUserState = {
	id: '',
	data: {}
}

export function loggedinUserReducer(state = loggedinUser, action: actions.UsersAction) {
	switch (action.type) {
		case actions.SIGNUP_SUCCESS:
		case actions.LOGIN_SUCCESS:
		case actions.GET_LOGGEDIN_USER_SUCCESS:
			let payload = action.payload;
			return {
				...state,
				data: {
					id: payload._id,
					username: payload.username,
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email 
				}
			}
		default:
			return state;
	}
}

export const getLoggedinUserId = (state: loggedinUserState) => state.data.id;
export const getLoggedinUserName = (state: loggedinUserState) => state.data.username;
export const getLoggedinUser = (state: loggedinUserState) => state.data;
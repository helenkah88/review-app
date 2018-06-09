import { User } from '../../models/user';

export interface UsersState {
	users: any[];
	loading: boolean;
	loaded: boolean;
}
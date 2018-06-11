import { User } from '../../models/user';

export interface UsersState {
	users: User[];
	loading: boolean;
	loaded: boolean;
}
import { Review } from '../../models/review';
import { ReviewsState } from '../models/reviews.state';
import { UsersState } from '../models/users.state';
import { currentUserState } from '../models/currentUser.state';

export interface AppState {
	reviews: ReviewsState;
	users: UsersState;
	currentUser: currentUserState;
}
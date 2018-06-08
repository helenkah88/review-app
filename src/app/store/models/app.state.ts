import { Review } from '../../models/review';
import { ReviewsState } from '../models/reviews.state';
import { UsersState } from '../models/users.state';

export interface AppState {
	reviews: ReviewsState;
	users: UsersState,
	currentUser
}
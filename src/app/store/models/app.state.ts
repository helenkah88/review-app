import { Review } from '../../models/review';
import { ReviewsState } from '../models/reviews.state';

export interface AppState {
	reviews: ReviewsState;
}
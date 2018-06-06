import { Review } from '../../models/review';

export interface ReviewsState {
	reviews: Review[];
	loading: boolean;
	loaded: boolean;
}
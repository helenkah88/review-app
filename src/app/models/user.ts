import { Review } from './review';

export class User {
  _id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  location?: object;
  reviews: Review[];
}
import { User } from './user';

export class Review {
  _id?:  string;
  title: string;
  user: any;
  description?: string;
  location?: string;
  reviewImgs?: string[];
}
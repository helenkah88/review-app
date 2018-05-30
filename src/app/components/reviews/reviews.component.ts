import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../models/review';

@Component({
  selector: 'review-app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  reviews: Review[];
  slideImgs: string[] = [];
  places: any[] = [];

  ngOnInit() {
    this.reviewService.getAll()
    .subscribe(response => {
      this.reviews = response.data;
      this.places = this.reviews.map(item => {
        return {
          placeId: item.location,
          id: item._id
        };
      });
      this.slideImgs = response.data.map(review => {
        if(!review.reviewImgs.length) return;
        return review.reviewImgs[review.reviewImgs.length - 1];
      });
    });
  }

}

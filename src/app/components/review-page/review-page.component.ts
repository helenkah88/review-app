import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../shared/services/review.service';

import { Review } from '../../models/review';

@Component({
  selector: 'review-app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.sass']
})
export class ReviewPageComponent implements OnInit {

  review: Review;
  slideImgs: string[] = [];
  places: string[] = [];

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.reviewId;
    this.reviewService.getSingle(id)
    .subscribe(response => {
      console.log(response.data);
      this.review = response.data;
      let location = [];
      location.push(this.review.location);
      this.places = location;
      this.slideImgs = response.data.reviewImgs;
    })
  }

}

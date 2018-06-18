import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { GET_REVIEWS } from '../../store/actions/reviews.actions';
import { selectReviewsByOwner, selectLoggedinUser } from '../../store/reducers/core.reducer';
import { UploadComponent } from '../upload/upload.component';
import { ReviewService } from '../../shared/services/review.service';
import { CreateComponentService } from '../../shared/services/create-component.service';

import { Review } from '../../models/review';

@Component({
  selector: 'review-app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
  entryComponents: [UploadComponent]
})
export class PostComponent implements OnInit {

  review: Review = new Review();
  private reviewId: string;
  private userId: string;
  places: any[] = [];

  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute,
    private createComponentService: CreateComponentService,
    private store: Store<AppState>
  ) {
    this.review.reviewImgs = [];
    this.store.dispatch({type: GET_REVIEWS});
  }


  ngOnInit() {
    this.reviewId = this.route.snapshot.params.reviewId;
    this.userId = this.route.snapshot.params.userId;
    
    if (this.reviewId) {
      this.store.pipe(
        select(selectLoggedinUser)
      )
      .subscribe();
      
      this.store.pipe(
        select(selectReviewsByOwner),
      )
      .subscribe(reviews => {
        console.log(reviews);
        this.review = reviews.find(review => review.user === this.userId);
      });
      /*this.reviewService.getSingleByOwner(this.reviewId)
      .subscribe(response => {
        this.review = response.data;
        let location: any;
        location.placeId = this.review.location;
        location.id = this.review._id;
        this.places = location;
      });*/
    }
  }

  deleteImg(e, idx) {
    e.preventDefault();

    if (e.target.tagName !== 'A') return;
    this.reviewService.deleteReviewImg(this.reviewId, idx)
      .subscribe(response => {
        this.review.reviewImgs = this.review.reviewImgs.filter((img, i) => {
          return i !== idx;
        })
      })
  }

  setAddress(data) {
    this.review.location = data;
  }

  saveReview() {
    let images = this.createComponentService.files;
    let fd = new FormData();
    images.forEach(file => {
      fd.append('reviewImg', file);
    });
    this.review.user = this.userId;

    for( let key in this.review) {
      fd.append(key, this.review[key]);
    }

    if (this.reviewId) {
      fd.delete('reviewImgs');
      this.reviewService.updateReview(this.reviewId, fd)
      .subscribe(response => {
        // console.log(response.data);
      })
    } else {
      this.reviewService.saveReview(fd)
      .subscribe(response => {
        // console.log(response.data);
      })
    }
  }
/*
  onNewAdded(e) {
    this.createComponentService.create(UploadComponent, this.dragContainer);
  }*/

}

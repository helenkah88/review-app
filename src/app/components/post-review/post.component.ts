import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { GET_REVIEWS, SAVE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW_IMAGE } from '../../store/actions/reviews.actions';
import { selectReviewsByOwner, selectLoggedinUser, selectReviews } from '../../store/reducers/core.reducer';
import { UploadComponent } from '../upload/upload.component';
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
  mapREview: Review[] = [];
  private reviewId: string;
  private userId: string;
  places: any[] = [];

  constructor(
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
        if(reviews && reviews.length) {
          this.review = reviews.find(review => review._id === this.reviewId);
          this.mapREview = [this.review];
        }
      });
    }
  }

  deleteImg(e, idx) {
    e.preventDefault();

    if (e.target.tagName !== 'A') return;
    this.store.dispatch({type: DELETE_REVIEW_IMAGE, payload: {reviewId: this.reviewId, index: idx}});
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
      this.store.dispatch({type: UPDATE_REVIEW, payload: {id: this.reviewId, data: fd}});
    } else {
      this.store.dispatch({type: SAVE_REVIEW, payload: fd});
    }
  }
/*
  onNewAdded(e) {
    this.createComponentService.create(UploadComponent, this.dragContainer);
  }*/

}

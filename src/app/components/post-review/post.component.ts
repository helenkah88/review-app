import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { GET_REVIEWS, SAVE_REVIEW, UPDATE_REVIEW } from '../../store/actions/reviews.actions';
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
  mapReview: Review[] = [];
  private reviewId: string;
  private userId: string;
  places: any[] = [];
  imagesToDelete: string[] = [];

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
          this.mapReview = [this.review];
        }
      });
    }
  }

  deleteImg(e, idx) {
    e.preventDefault();

    if (e.target.tagName !== 'A') return;

    this.imagesToDelete.push(this.review.reviewImgs[idx]);
    this.review.reviewImgs = this.review.reviewImgs.filter((img, i) => {
      return i !== idx;
    });
  }

  setAddress(data) {
    this.review.location = data;
  }

  saveReview() {
    let imagesToAdd = this.createComponentService.files;

    let fd = new FormData();
    fd.delete('reviewImg');
    imagesToAdd.forEach(file => {
      fd.append('reviewImg', file);
    });
    this.review.user = this.userId;

    for( let key in this.review) {
      if(key === 'reviewImgs') continue;
      fd.append(key, this.review[key]);
    }

    if (this.reviewId) {
      this.imagesToDelete.forEach(img => {
        fd.append('imgsToDelete', img);
      });
      this.store.dispatch({type: UPDATE_REVIEW, payload: {id: this.reviewId, data: fd}});

      this.imagesToDelete.length = 0;
    } else {
      this.store.dispatch({type: SAVE_REVIEW, payload: fd});
    }
    this.createComponentService.clearFiles();
  }
/*
  onNewAdded(e) {
    this.createComponentService.create(UploadComponent, this.dragContainer);
  }*/

}

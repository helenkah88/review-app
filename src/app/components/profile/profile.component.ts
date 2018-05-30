import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ReviewService } from '../../shared/services/review.service';
import { User } from '../../models/user';

@Component({
  selector: 'review-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user: User = new User;

  constructor(private userService: UserService, private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.userId;
    this.userService.getOwner(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })
  }

  deleteReview(id) {
    this.reviewService.deleteReview(id)
    .subscribe(response => {
        this.user.reviews = this.user.reviews.filter(item => {
          return item._id !== id;
        })
    })
  }

  saveSettings() {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'review-app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.userId;
    this.userService.getSingle(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })
  }

}

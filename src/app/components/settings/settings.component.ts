import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'review-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.userId;
    this.userService.getOwner(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })
  }

  saveSettings() {
    this.userService.updateUser(this.user._id, this.user)
    .subscribe(response => {
        console.log(response.msg);
    })
  }

  deleteProfile(id) {
    this.userService.deleteUser(id)
    .subscribe(response => {
        console.log(response.msg);
    })
  }

}

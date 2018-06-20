import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { UPDATE_USER } from '../../store/actions/users.actions';
import { selectLoggedinUser } from '../../store/reducers/core.reducer';

import { User } from '../../models/user';

@Component({
  selector: 'review-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  user: User;
  private userId: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.pipe(
      select(selectLoggedinUser)
    )
    .subscribe(id => this.userId = id);
    /*this.userService.getOwner(id)
    .subscribe(response => {
      this.user = response.data;
      console.log(this.user);
    })*/
  }

  saveSettings() {
    this.store.dispatch({type: UPDATE_USER, payload: this.user});
    /*this.userService.updateUser(this.user)
    .subscribe(response => {
        console.log(response.msg);
    })*/
  }

  /*deleteProfile(id) {
    this.userService.deleteUser(id)
    .subscribe(response => {
        console.log(response.msg);
    })
  }*/

}

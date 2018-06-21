import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { UPDATE_USER, DELETE_USER } from '../../store/actions/users.actions';
import { selectLoggedinUser } from '../../store/reducers/core.reducer';

import { User } from '../../models/user';

@Component({
  selector: 'review-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.pipe(
      select(selectLoggedinUser)
    )
    .subscribe(user => {
      this.user = user;
      console.log(user);
    });
    
  }

  saveSettings() {
    this.store.dispatch({type: UPDATE_USER, payload: this.user});
  }

  deleteProfile(id) {
    this.store.dispatch({type: DELETE_USER, payload: id});
    return false;
  }

}

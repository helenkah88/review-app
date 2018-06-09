import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../../models/user';
import { AuthService } from '../../shared/services/auth.service';
import * as actions from '../../store/actions/users.actions';
import { AppState } from '../../store/models/app.state';

@Component({
  selector: 'review-app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public newUser: User;

  constructor(private store: Store<AppState>) {
  }
  ngOnInit() {

    this.newUser = new User();
  }

  signup() {
    this.store.dispatch(new actions.Sign(this.newUser));
    /*this.authService.signup(this.newUser)
    .subscribe((response) => {
      this.authService.saveToken(response.data.token);
    })*/
  }

}

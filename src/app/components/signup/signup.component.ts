import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { User } from '../../models/user';
import { AuthService } from '../../shared/services/auth.service';
import * as actions from '../../store/actions/auth.actions';
import { AppState } from '../../store/models/app.state';
import { selectLoggedinUser } from '../../store/reducers/core.reducer';

@Component({
  selector: 'review-app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public newUser: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.newUser = new User();

    this.store.pipe(
      select(selectLoggedinUser)
    )
    .subscribe(user => console.log(user))
  }

  signup() {
    console.log('signup');
    this.store.dispatch({ type: actions.SIGNUP, payload: this.newUser});
  }

}

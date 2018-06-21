import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';

import { AppState } from '../../store/models/app.state';
import { User } from '../../models/user';
import { LOGIN } from '../../store/actions/auth.actions';
import { selectLoggedinUser } from '../../store/reducers/core.reducer';

@Component({
  selector: 'review-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<LoginComponent>) {
  }
  ngOnInit() {
    this.user = new User();

    this.store.pipe(
      select(selectLoggedinUser)
    )
    .subscribe()
  }

  dismiss() {
    this.dialogRef.close('pum');
  }

  login() {
    this.store.dispatch({type: LOGIN, payload: this.user});
    this.dialogRef.close(this.user);
  }

}

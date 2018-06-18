import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/models/app.state';
import { GET_LOGGEDIN_USER } from './store/actions/auth.actions';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'review-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
  	private store: Store<AppState>,
  	private authService: AuthService
  ) {
  	if(this.authService.isAuthenticated) {
  		this.store.dispatch({type: GET_LOGGEDIN_USER});
  	}
  }
}

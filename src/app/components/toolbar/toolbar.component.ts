import { Component, OnInit, NgZone, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/models/app.state';
import { selectLoggedinUser } from '../../store/reducers/core.reducer';

const SMALL_SCREEN: number = 640;

@Component({
  selector: 'review-app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @Output('toggleNav') toggleNav: EventEmitter<any> = new EventEmitter();

  private matchMedia: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN}px)`);
  loggedInUserId: string = '';

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private zone: NgZone,
    private authService: AuthService
  ) {
    this.matchMedia.addListener(listener => {
      zone.run(() => this.matchMedia = listener)
    });
  }

  ngOnInit() {
    this.store.pipe(
      select(selectLoggedinUser)
    ).subscribe(userId => {
      console.log(userId);
      this.loggedInUserId = userId;
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  toggle() {
    this.toggleNav.emit();
  }

  isSmallScreen(): boolean {
    return this.matchMedia.matches;
  }

}

import { Component, OnInit, NgZone, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

const SMALL_SCREEN: number = 640;

@Component({
  selector: 'review-app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @Output('toggleNav') toggleNav: EventEmitter<any> = new EventEmitter();

  private matchMedia: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN}px)`);

  constructor(private dialog: MatDialog, private zone: NgZone, private authService: AuthService) {
    this.matchMedia.addListener(listener => {
      zone.run(() => this.matchMedia = listener)
    });
  }

  ngOnInit() {}

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

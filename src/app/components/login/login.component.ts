import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'review-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) {
  }
  ngOnInit() {
    this.user = new User();
  }

  dismiss() {
    this.dialogRef.close('pum');
  }

  login() {
    console.log(this.user);
    this.authService.login(this.user)
    .subscribe((response) => {
      this.authService.saveToken(response.token);
      this.dialogRef.close(this.user);
    })
  }

}

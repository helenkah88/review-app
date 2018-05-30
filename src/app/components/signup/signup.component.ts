import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'review-app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public newUser: User;

  constructor(private authService: AuthService) {
  }
  ngOnInit() {

    this.newUser = new User();
  }

  signup() {
    this.authService.signup(this.newUser)
    .subscribe((response) => {
      this.authService.saveToken(response.data.token);
    })
  }

}

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../components/login/login.component';
import { AuthService } from '../../shared/services/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private dialog: MatDialog) {}

  intercept(req, next) {
    let auth = this.injector.get(AuthService);
    let reqClone = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + auth.token)
    });

    return next.handle(reqClone)
    .do(null, (err: any) => {
      if(err instanceof HttpErrorResponse) {
        if(err.status === 401) {
          let dialogRef = this.dialog.open(LoginComponent, {
            width: '300px'
          });
        }
      }
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ReviewsEffects } from './store/effects/reviews.effects';
import { reducers } from './store/reducers/core.reducer';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { ReviewService } from './shared/services/review.service';
import { UserService } from './shared/services/user.service';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './shared/services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post-review/post.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UploadComponent } from './components/upload/upload.component';
import { DraguploadDirective } from './directives/dragupload.directive';
import { CreateComponentService } from './shared/services/create-component.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MapsComponent } from './components/maps/maps.component';


let routes: Routes = [
  { path: '', component: ReviewsComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'user/:userId', component: UserPageComponent},
  { path: ':userId/settings', component: SettingsComponent},
  { path: ':userId/review/new', component: PostComponent},
  { path: ':userId/review/:reviewId/edit', component: PostComponent},
  { path: 'review/:reviewId', component: ReviewPageComponent},
  { path: 'profile/:userId', component: ProfileComponent},
  { path: '**', component: ReviewsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    SignupComponent,
    LoginComponent,
    ReviewsComponent,
    UserPageComponent,
    ReviewPageComponent,
    ProfileComponent,
    PostComponent,
    SettingsComponent,
    UploadComponent,
    DraguploadDirective,
    CarouselComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ReviewsEffects]),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ReviewService,
    UserService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    CreateComponentService
  ],
  entryComponents: [UploadComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatProgressBarModule,
  MatDialogModule,
  MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule { }

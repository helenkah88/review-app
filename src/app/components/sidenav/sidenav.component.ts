import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'review-app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  constructor() { }

  ngOnInit() {}

  toggleNav() {
    this.sidenav.toggle();
  }

}

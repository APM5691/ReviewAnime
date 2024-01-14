import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  review: boolean = false;

  constructor() {}

  ngOnInit() {}

  openDialog() {
    this.review = !this.review;
  }
}

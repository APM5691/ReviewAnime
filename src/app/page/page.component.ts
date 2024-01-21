import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent | undefined;
  review: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.header) {
        this.header.getAnimesWatched();
        this.header.getNumberOfAnimes();
        this.header.getNumberOfAnimes();
      }
    });
  }
}

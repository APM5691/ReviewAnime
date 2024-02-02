import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../utils/shared/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from '../../utils/shared/review/review.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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

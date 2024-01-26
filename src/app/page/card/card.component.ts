import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(public dialog: MatDialog) {}

  @Input() anime: any;

  goToAnime(id: number) {
    this.dialog.open(ReviewComponent, {
      data: id,
    });
  }
}

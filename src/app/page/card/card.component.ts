import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Anime } from 'src/app/utils/models/anime.interface';
import { UpdateReviewComponent } from '../update-review/update-review.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(public dialog: MatDialog) {}

  @Input() anime: any;

  goToAnime(id: number) {
    this.dialog.open(UpdateReviewComponent, {
      data: id,
    });
  }
}

import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from '../review/review.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() anime: any;
  @Output() meClick = new EventEmitter<any>();
  qualification: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Anime: ', this.anime);

    if (this.anime.qualification) {
      this.qualification = this.anime.qualification[0].qualification;
    }
  }

  goToAnime(id: number) {
    let diag = this.dialog.open(ReviewComponent, {
      data: id,
    });

    diag.afterClosed().subscribe((result) => {
      this.meClick.emit();
    });
  }
}

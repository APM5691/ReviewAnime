import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { HeaderComponent } from 'src/app/utils/shared/header/header.component';
import { ReviewComponent } from 'src/app/utils/shared/review/review.component';

@Component({
  selector: 'app-pendients',
  templateUrl: './pendients.component.html',
  styleUrls: ['./pendients.component.css'],
})
export class PendientsComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent | undefined;
  review: boolean = false;
  loading: boolean = true;
  animesPending: any;
  animesWatching: any;
  animesSeen: any;

  constructor(private animeService: AnimeService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getPendients();
    this.getAnimesWatched();
    this.getAnimesSeen();
  }

  getPendients() {
    let data = {
      type: '4',
    };
    this.animeService.getByQualificationType(data).subscribe((data) => {
      console.log('Pending data: ', data);

      this.animesPending = data;
    });
  }

  getAnimesWatched() {
    let data = {
      type: '2',
    };
    this.animeService.getByQualificationType(data).subscribe((data) => {
      console.log('Watching data: ', data);

      this.animesWatching = data;
    });
  }

  getAnimesSeen() {
    let data = {
      type: '1',
    };
    this.animeService.getByQualificationType(data).subscribe((data) => {
      console.log('Seen data: ', data);
      this.animesSeen = data;
      this.loading = false;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.header) {
        this.header.getAnimesWatched();
        this.header.getNumberOfAnimes();
        this.header.getNumberOfAnimes();

        this.recharge();
      }
    });
  }

  recharge() {
    this.loading = true;

    this.getPendients();
    this.getAnimesWatched();
    this.getAnimesSeen();
  }
}

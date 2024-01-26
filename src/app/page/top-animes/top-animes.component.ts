import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-top-animes',
  templateUrl: './top-animes.component.html',
  styleUrls: ['./top-animes.component.css'],
})
export class TopAnimesComponent implements OnInit {
  animes: any = [];
  displayedColumns: string[] = ['img', 'title', 'score', 'actions'];

  constructor(private animeService: AnimeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes() {
    this.animeService.getTop().subscribe((animes) => {
      this.animes = animes;
    });
  }

  watch(id: number) {
    this.dialog.open(VideoPlayerComponent, {
      data: id,
    });
  }

  edit(id: number) {
    this.dialog.open(ReviewComponent, {
      data: id,
    });
  }
}

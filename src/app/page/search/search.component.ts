import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';
import { VideoService } from 'src/app/utils/services/video.service';
import { activateNotifications } from 'src/app/utils/shared/notifications.function';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'finished', 'url', 'Acciones'];
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  loading: boolean = false;
  animes: any;

  constructor(
    public animeService: AnimeService,
    public videoService: VideoService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.searchForm.valid) {
      alert('Please fill out the form before submitting!');
      return;
    }

    let value = {
      search: this.searchForm.value.search,
    };

    this.animeService.getSearch(value).subscribe((res: any) => {
      if (res.length == 0) {
        activateNotifications(
          'No se encontraron animes',
          'right',
          'top',
          this._snackBar
        );
        return;
      }

      this.animes = res;

      activateNotifications(
        'Se encontraron animes',
        'right',
        'top',
        this._snackBar
      );

      this.loading = true;
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

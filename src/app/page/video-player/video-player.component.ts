import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Video } from 'src/app/utils/models/video.interface';
import { VideoService } from 'src/app/utils/services/video.service';
import { activateNotifications } from 'src/app/utils/shared/notifications.function';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  id: number = 0;
  loading: boolean = true;
  videos: any;
  actualVideo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public videoService: VideoService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    console.log(this.id);
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideoFromAnime(this.id).subscribe((res: any) => {
      console.log(res);

      if (res.length == 0) {
        activateNotifications(
          'No se encontraron videos',
          'right',
          'top',
          this._snackBar
        );
        return;
      }

      this.videos = res;

      this.actualVideo = this.videos[0];

      this.loading = false;
    });
  }
}

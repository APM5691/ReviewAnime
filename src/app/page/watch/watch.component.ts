import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/utils/services/video.service';
import { WebsocketsService } from 'src/app/utils/services/websockets.service';
import { activateNotifications } from 'src/app/utils/shared/notifications.function';
import { ChatComponent } from './chat/chat.component';
import { AnimeService } from 'src/app/utils/services/anime.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
})
export class WatchComponent implements OnInit, OnDestroy {
  @ViewChild('chat') chat: ChatComponent | undefined;
  loading: boolean = false;
  animesToSelect: any;
  animeSelected: any;
  actualVideo: any = null;
  idAnime: number = 0;
  videos: any;

  constructor(
    private animesService: AnimeService,
    private websocketsService: WebsocketsService,
    private videoService: VideoService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAnimesWithVideos();
  }

  ngOnDestroy() {
    this.websocketsService.leaveRoom();
  }

  getAnimesWithVideos() {
    this.animesService.getAnimesWithVideos().subscribe((res: any) => {
      console.log(res);
      this.animesToSelect = res;
      this.loading = true;
    });
  }

  onAnimeSelect(animeId: number) {
    this.idAnime = animeId;
    this.getVideos();

    this.websocketsService.leaveRoom();
    this.websocketsService.setUserForUsers();
    this.websocketsService.initUsers();
    this.websocketsService.joinRoom(animeId.toString());
    this.websocketsService.initChat();
  }

  getVideos() {
    this.videoService.getVideoFromAnime(this.idAnime).subscribe((res: any) => {
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
      this.loading = true;
      this.animeSelected = true;
    });
  }

  onVideoChange(videoId: any) {
    let video = this.videos.find((video: any) => video.id == videoId);
    this.actualVideo = video;
  }

  sendMessage(message: string) {
    console.log(message);

    this.websocketsService.sendMessage({ message });
  }
}

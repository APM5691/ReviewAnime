import { Injectable } from '@angular/core';
import { Repository } from '../repository.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/video.interface';

@Injectable({ providedIn: 'root' })
export class VideoService extends Repository<Video> {
  constructor(http: HttpClient) {
    super(http);
    this.path = 'videos';
  }

  getVideoFromAnime(id: number) {
    return this.http.get<Video[]>(`${this.fullRoute()}/anime/${id}`);
  }
}

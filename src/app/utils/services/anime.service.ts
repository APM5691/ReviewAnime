import { Injectable } from '@angular/core';
import { Repository } from '../repository.service';
import { Anime } from '../models/anime.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnimeService extends Repository<Anime> {
  constructor(http: HttpClient) {
    super(http);
    this.path = 'animes';
  }

  getTop() {
    return this.http.get(`${this.fullRoute()}/top`);
  }

  getRecents() {
    return this.http.get(`${this.fullRoute()}/recents`);
  }

  getAnimeWithOutReview() {
    return this.http.get(`${this.fullRoute()}/animeWithOutReview`);
  }

  getNumberOfAnimes() {
    return this.http.get(`${this.fullRoute()}/numberOfAnimes`);
  }

  getSearch(search: Object) {
    return this.http.post(`${this.fullRoute()}/search`, { search });
  }

  getQualificationAndAnimeByUser(data: object) {
    return this.http.post(
      `${this.fullRoute()}/getQualificationAndAnimeByUser`,
      data
    );
  }
}

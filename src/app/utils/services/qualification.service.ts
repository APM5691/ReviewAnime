import { Injectable } from '@angular/core';
import { Repository } from '../repository.service';
import { Anime } from '../models/anime.interface';
import { HttpClient } from '@angular/common/http';
import { Qualification } from '../models/qualification.interface';

@Injectable({ providedIn: 'root' })
export class QualificationService extends Repository<Qualification> {
  constructor(http: HttpClient) {
    super(http);
    this.path = 'qualifications';
  }

  getPercentage() {
    return this.http.get(`${this.fullRoute()}/percentageComplete`);
  }

  getAnimesWatched() {
    return this.http.get(`${this.fullRoute()}/animesWatched`);
  }
}

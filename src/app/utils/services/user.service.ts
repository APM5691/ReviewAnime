import { Injectable } from '@angular/core';
import { Repository } from '../repository.service';
import { Anime } from '../models/anime.interface';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService extends Repository<User> {
  constructor(http: HttpClient) {
    super(http);
    this.path = 'users';
  }
}

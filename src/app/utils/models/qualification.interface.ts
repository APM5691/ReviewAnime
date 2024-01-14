import { Anime } from './anime.interface';
import { User } from './user.interface';

export interface Qualification {
  id: number;
  qualification: number;
  reviewed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  anime: Anime;
}

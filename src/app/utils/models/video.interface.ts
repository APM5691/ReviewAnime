import { Anime } from './anime.interface';

export interface Video {
  id: number;
  url: string;
  numberOfEpisode: number;
  anime: Anime;
}

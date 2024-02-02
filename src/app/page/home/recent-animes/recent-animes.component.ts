import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';

@Component({
  selector: 'app-recent-animes',
  templateUrl: './recent-animes.component.html',
  styleUrls: ['./recent-animes.component.css'],
})
export class RecentAnimesComponent implements OnInit {
  animes: Anime[] = [];
  displayedColumns: string[] = ['img', 'name'];

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes() {
    this.animeService.getRecents().subscribe((animes: any) => {
      animes.forEach((anime: any) => {
        this.animes.push(anime);
      });
    });
  }
}

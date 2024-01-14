import { Component, Input, OnInit } from '@angular/core';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';

@Component({
  selector: 'app-top-animes',
  templateUrl: './top-animes.component.html',
  styleUrls: ['./top-animes.component.css'],
})
export class TopAnimesComponent implements OnInit {
  animes: any = [];
  displayedColumns: string[] = ['img', 'title', 'score'];

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes() {
    this.animeService.getTop().subscribe((animes) => {
      console.log('top', animes);

      this.animes = animes;
    });
  }
}

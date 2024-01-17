import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Anime } from 'src/app/utils/models/anime.interface';
import { AnimeService } from 'src/app/utils/services/anime.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  displayedColumns: string[] = ['image', 'name', 'finished', 'url'];
  animes: any;

  constructor(public animeService: AnimeService) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.searchForm.valid) {
      alert('Please fill out the form before submitting!');
      return;
    }

    let value = {
      search: this.searchForm.value.search,
    };

    this.animeService.getSearch(value).subscribe((res: any) => {
      console.log(res);

      this.animes = res;
    });
  }
}

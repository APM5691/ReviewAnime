import { Component, Input } from '@angular/core';
import { Anime } from 'src/app/utils/models/anime.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() anime: any;
}

import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  cards: any;

  constructor() {}

  ngOnInit(): void {
    this.cards = [
      {
        name: 'Card 1',
        subname: 'Subtitle 1',
        description: 'Content 1',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      },
      {
        name: 'Card 2',
        subname: 'Subtitle 2',
        description: 'Content 2',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      },
      {
        name: 'Card 3',
        subname: 'Subtitle 3',
        description: 'Content 3',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      },
    ];
  }
}

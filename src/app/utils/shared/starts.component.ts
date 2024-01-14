import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starts',
  template: `
    <div class="d-flex change">
      <ng-container *ngFor="let i of arrayWithStarts">
        <mat-icon *ngIf="i == 'full'">star</mat-icon>
        <mat-icon *ngIf="i == 'half'">star_half</mat-icon>
        <mat-icon *ngIf="i == 'empty'">star_border</mat-icon>
      </ng-container>
    </div>
  `,
  styles: [
    `
      @media (max-width: 768px) {
        .change {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class StartsComponent implements OnInit {
  @Input() qualification: number = 0;
  start: number = 1;
  end: number = 5;
  arrayWithStarts: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cleanArrayWithStarts();
    this.structureArrayOfStarts();
  }

  ngOnChanges(): void {
    this.cleanArrayWithStarts();
    this.structureArrayOfStarts();
  }

  cleanArrayWithStarts() {
    this.arrayWithStarts = [];
  }

  structureArrayOfStarts() {
    for (let i = this.start; i <= this.end; i++) {
      let typeOfStart: string;

      // if this.calificarion is multipli of 1 put to typeofstart full

      if (this.qualification % 1 == 0) {
        if (i <= this.qualification) {
          typeOfStart = 'full';
        } else {
          typeOfStart = 'empty';
        }
      } else {
        // if this.qualification is not multipli of 1 put to typeofstart half

        if (i <= Math.floor(this.qualification)) {
          typeOfStart = 'full';
        } else if (i == Math.ceil(this.qualification)) {
          typeOfStart = 'half';
        } else {
          typeOfStart = 'empty';
        }
      }

      this.arrayWithStarts.push(typeOfStart);
    }
  }
}

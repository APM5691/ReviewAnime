import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { CommonModule } from '@angular/common';
import { PendientsComponent } from './pendients/pendients.component';

@NgModule({
  imports: [CommonModule, PageRoutingModule],
})
export class PageModule {}

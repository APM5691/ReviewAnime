import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../utils/mat.module';
import { TopAnimesComponent } from './top-animes/top-animes.component';
import { RecentAnimesComponent } from './recent-animes/recent-animes.component';
import { CardComponent } from './card/card.component';
import { ReviewComponent } from './review/review.component';
import { SearchComponent } from './search/search.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    TopAnimesComponent,
    RecentAnimesComponent,
    CardComponent,
    ReviewComponent,
    SearchComponent,
    VideoPlayerComponent,
    EditComponent,
  ],
  imports: [CommonModule, PageRoutingModule, AngularMaterialModule],
  providers: [],
})
export class PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from 'src/app/utils/mat.module';
import { RecentAnimesComponent } from './recent-animes/recent-animes.component';
import { ReviewComponent } from '../../utils/shared/review/review.component';
import { SearchComponent } from './search/search.component';
import { TopAnimesComponent } from './top-animes/top-animes.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    RecentAnimesComponent,
    SearchComponent,
    TopAnimesComponent,
    VideoPlayerComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, AngularMaterialModule],
})
export class HomeModule {}

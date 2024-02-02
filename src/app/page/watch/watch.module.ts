import { NgModule } from '@angular/core';
import { WatchComponent } from './watch.component';
import { CommonModule } from '@angular/common';
import { WatchRoutingModule } from './watch-routing.module';
import { AngularMaterialModule } from 'src/app/utils/mat.module';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [WatchComponent, ChatComponent, UsersComponent],
  imports: [CommonModule, WatchRoutingModule, AngularMaterialModule],
})
export class WatchModule {}

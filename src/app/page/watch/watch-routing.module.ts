import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchComponent } from './watch.component';
import { loginGuard } from 'src/app/utils/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: WatchComponent,
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./home/home.module')).HomeModule,
  },
  {
    path: 'watchlist',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./watch/watch.module')).WatchModule,
  },
  {
    path: 'pendients',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./pendients/pendients.module')).PendientsModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}

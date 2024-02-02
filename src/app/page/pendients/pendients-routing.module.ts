import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from 'src/app/utils/guards/login.guard';
import { PendientsComponent } from './pendients.component';

const routes: Routes = [
  {
    path: '',
    component: PendientsComponent,
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendientsRoutingModule {}

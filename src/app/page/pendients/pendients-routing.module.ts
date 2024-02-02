import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendientsComponent } from './pendients.component';

const routes: Routes = [
  {
    path: '',
    component: PendientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendientsRoutingModule {}

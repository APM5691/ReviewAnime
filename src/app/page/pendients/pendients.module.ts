import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendientsComponent } from './pendients.component';
import { AngularMaterialModule } from 'src/app/utils/mat.module';
import { PendientsRoutingModule } from './pendients-routing.module';

@NgModule({
  declarations: [PendientsComponent],
  imports: [CommonModule, PendientsRoutingModule, AngularMaterialModule],
})
export class PendientsModule {}

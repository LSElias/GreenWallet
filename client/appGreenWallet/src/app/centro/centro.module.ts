import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroRoutingModule } from './centro-routing.module';
import { CentroIndexComponent } from './centro-index/centro-index.component';
import { CentroDetalleComponent } from './centro-detalle/centro-detalle.component';


@NgModule({
  declarations: [
    CentroIndexComponent,
    CentroDetalleComponent
  ],
  imports: [
    CommonModule,
    CentroRoutingModule
  ]
})
export class CentroModule { }

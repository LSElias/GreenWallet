import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BilleteraRoutingModule } from './billetera-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BilleteraRoutingModule,
    MatGridListModule,
  ]
})
export class BilleteraModule { }

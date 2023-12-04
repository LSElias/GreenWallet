import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BilleteraRoutingModule } from './billetera-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BilleteraRoutingModule
  ]
})
export class BilleteraModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';


@NgModule({
  declarations: [
  
    ReporteGeneralComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ],
  exports: [
    ReporteGeneralComponent
  ]
})
export class ReportesModule { }

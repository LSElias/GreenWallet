import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { ReporteCentroComponent } from './reporte-centro/reporte-centro.component';

const routes: Routes = [
  {
    path: 'centro/general',
    component: ReporteGeneralComponent,
  },
  {
    path: 'centro/acopio',
    component: ReporteCentroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

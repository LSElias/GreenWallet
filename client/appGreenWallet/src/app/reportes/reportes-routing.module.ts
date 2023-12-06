import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';

const routes: Routes = [
  {
    path: 'centro/general',
    component: ReporteGeneralComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

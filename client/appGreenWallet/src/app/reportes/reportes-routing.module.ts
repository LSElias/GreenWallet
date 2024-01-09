import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { ReporteCentroComponent } from './reporte-centro/reporte-centro.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  {
    path: 'centro/general',
    component: ReporteGeneralComponent,
    canActivate:[authGuard], data:{rol:[1]}
  },
  {
    path: 'centro/acopio',
    component: ReporteCentroComponent,
    canActivate:[authGuard], data:{rol:[2]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroIndexComponent } from './centro-index/centro-index.component';
import { CentroDetalleComponent } from './centro-detalle/centro-detalle.component';

const routes: Routes = [

  { path:'centros', component: CentroIndexComponent},
  { path:'centros/:id',component: CentroDetalleComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroRoutingModule { }

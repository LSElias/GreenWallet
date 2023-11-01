import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexMaterialesComponent } from './index-materiales/index-materiales.component';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';

const routes: Routes = [
  { path:'materiales',component: IndexMaterialesComponent},
  { path:'materiales/:id',component: TipoMaterialesComponent},
  { path:'materiales/detalle/:id', component: MaterialDetalleComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }

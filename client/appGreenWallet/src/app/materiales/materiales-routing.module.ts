import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexMaterialesComponent } from './index-materiales/index-materiales.component';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';

const routes: Routes = [
  { path:'materiales',component: IndexMaterialesComponent},
  { path:'materiales/:id',component: TipoMaterialesComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }

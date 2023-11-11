import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroIndexComponent } from './centro-index/centro-index.component';
import { CentroDetalleComponent } from './centro-detalle/centro-detalle.component';
import { AllComponent } from './all/all.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [

  { path:'centros', component: CentroIndexComponent},
  { path:'centros/mantenimiento', component: AllComponent},
  { path:'centros/crear', component: FormComponent},
  { path:'centros/:id',component: CentroDetalleComponent},
  { path: 'centros/actualizar/:id', component: FormComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroIndexComponent } from './centro-index/centro-index.component';
import { CentroDetalleComponent } from './centro-detalle/centro-detalle.component';
import { AllComponent } from './all/all.component';
import { FormComponent } from './form/form.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [

  { path:'centros', component: CentroIndexComponent},
  
  { path:'centros/mantenimiento', component: AllComponent,
  canActivate:[authGuard], data:{rol:[1]}},
  
  { path:'centros/crear', component: FormComponent,
  canActivate:[authGuard], data:{rol:[1]}},
 
  { path:'centros/:id',component: CentroDetalleComponent},
  
  { path: 'centros/actualizar/:id', component: FormComponent,
  canActivate:[authGuard], data:{rol:[1]}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroRoutingModule { }

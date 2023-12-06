import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexMaterialesComponent } from './index-materiales/index-materiales.component';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { AllComponent } from './all/all.component';
import { FormComponent } from './form/form.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  { path:'materiales',component: IndexMaterialesComponent},

  { path:'materiales/mantenimiento', component: AllComponent,
          canActivate:[authGuard], data:{rol:[1]}},

  { path:'materiales/crear', component: FormComponent,
          canActivate:[authGuard], data:{rol:[1]}},

  { path:'materiales/:id',component: TipoMaterialesComponent},
  
  { path:'materiales/actualizar/:id', component: FormComponent,
          canActivate:[authGuard], data:{rol:[1]}},

  { path:'materiales/detalle/:id', component: MaterialDetalleComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AllComponent } from './all/all.component';
import { IntercambioComponent } from './intercambio/intercambio.component';
import { CuponComponent } from './cupon/cupon.component';
import { HistorialComponent } from './historial/historial.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  { path: 'recompensa', component: IndexComponent },

  { path: 'recompensa/crear', component: FormComponent,
  canActivate:[authGuard], data:{rol:[1]}},

  { path: 'cupones/historial', component: HistorialComponent,
  canActivate:[authGuard], data:{rol:[3]}},
  
  { path: 'recompensa/mantenimiento', component: AllComponent,
  canActivate:[authGuard], data:{rol:[1]} },
 
  { path: 'recompensa/:id', component: DetalleComponent },
 
  { path: 'recompensa/cupon/:id', component: CuponComponent,
  canActivate:[authGuard], data:{rol:[3]}  },
  
  { path: 'recompensa/intercambio/:id', component: IntercambioComponent,
  canActivate:[authGuard], data:{rol:[3]} },
 
  { path: 'recompensa/actualizar/:id', component: FormComponent, 
  canActivate:[authGuard], data:{rol:[1]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecompensaRoutingModule {}

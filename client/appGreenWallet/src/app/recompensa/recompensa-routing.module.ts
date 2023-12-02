import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  { path: 'recompensas', component: IndexComponent},
  { path: 'recompensa/crear', component: FormComponent },
  { path: 'recompensas/:id', component: DetalleComponent },
  { path: 'recompensas/actualizar/:id', component: FormComponent },
  { path: 'recompensas/mantenimiento/:id', component: AllComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecompensaRoutingModule {}

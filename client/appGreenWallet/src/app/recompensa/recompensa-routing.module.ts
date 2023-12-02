import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  { path: 'recompensa', component: IndexComponent },
  { path: 'recompensa/crear', component: FormComponent },
  { path: 'recompensa/mantenimiento/', component: AllComponent },
  { path: 'recompensa/:id', component: DetalleComponent },
  { path: 'recompensa/actualizar/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecompensaRoutingModule {}

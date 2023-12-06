import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  { path:'billetera', component: DashboardComponent,
          canActivate:[authGuard], data:{rol:[3]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BilleteraRoutingModule { }

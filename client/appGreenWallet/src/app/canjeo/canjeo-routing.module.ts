import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AdminHistorialComponent } from './admin-historial/admin-historial.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegistrarComponent } from './registrar/registrar.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  {path:'canjeo/historial', component: HistorialComponent,
  canActivate:[authGuard], data:{rol:[3]} },
  
  {path:'canjeo/registrar', component: RegistrarComponent,
    canActivate:[authGuard], data:{rol:[2]}},
  
  {path:'canjeo/admin/historial', component: AdminHistorialComponent,
          canActivate:[authGuard], data:{rol:[2]}},
  
  {path:'canjeo/detalle/:id', component: DetalleComponent,
          canActivate:[authGuard], data:{rol:[2,3]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CanjeoRoutingModule { }

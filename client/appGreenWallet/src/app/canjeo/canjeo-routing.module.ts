import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AdminHistorialComponent } from './admin-historial/admin-historial.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {path:'canjeo/historial', component: HistorialComponent },
  {path:'canjeo/admin/historial', component: AdminHistorialComponent },
  {path:'canjeo/detalle/:id', component: DetalleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CanjeoRoutingModule { }

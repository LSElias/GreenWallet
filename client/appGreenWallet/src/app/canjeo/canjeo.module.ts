import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanjeoRoutingModule } from './canjeo-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { AdminHistorialComponent } from './admin-historial/admin-historial.component';
import { HistorialComponent } from './historial/historial.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DetalleComponent,
    AdminHistorialComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    CanjeoRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class CanjeoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecompensaRoutingModule } from './recompensa-routing.module';
import { AllComponent } from './all/all.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { HistorialComponent } from './historial/historial.component';
import { DetalleComponent } from './detalle/detalle.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AllComponent,
    IndexComponent,
    FormComponent,
    HistorialComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    RecompensaRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class RecompensaModule { }

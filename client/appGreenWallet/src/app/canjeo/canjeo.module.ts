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
import { RegistrarComponent } from './registrar/registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    DetalleComponent,
    AdminHistorialComponent,
    HistorialComponent,
    RegistrarComponent,
  ],
  imports: [
    CommonModule,
    CanjeoRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class CanjeoModule {}

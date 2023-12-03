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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


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
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class RecompensaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroRoutingModule } from './centro-routing.module';
import { CentroIndexComponent } from './centro-index/centro-index.component';
import { CentroDetalleComponent } from './centro-detalle/centro-detalle.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { AllComponent } from './all/all.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    CentroIndexComponent,
    CentroDetalleComponent,
    AllComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CentroRoutingModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class CentroModule { }

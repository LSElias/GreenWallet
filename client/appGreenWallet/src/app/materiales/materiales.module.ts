import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { MaterialesRoutingModule } from './materiales-routing.module';
import { IndexMaterialesComponent } from './index-materiales/index-materiales.component';
import { DiagMaterialesComponent } from './diag-materiales/diag-materiales.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    DiagMaterialesComponent,
    IndexMaterialesComponent,
    TipoMaterialesComponent,
    MaterialDetalleComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
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
export class MaterialesModule { }

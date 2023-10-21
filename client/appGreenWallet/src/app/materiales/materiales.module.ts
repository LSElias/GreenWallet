import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { IndexMaterialesComponent } from './index-materiales/index-materiales.component';
import { DiagMaterialesComponent } from './diag-materiales/diag-materiales.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DiagMaterialesComponent,
    IndexMaterialesComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    MatDialogModule
  ]
})
export class MaterialesModule { }

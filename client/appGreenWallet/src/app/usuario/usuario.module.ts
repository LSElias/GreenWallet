import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { AllComponent } from './all/all.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { CrearAdminComponent } from './crear-admin/crear-admin.component';
import { AllAdmisComponent } from './all-admis/all-admis.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    UsuarioLoginComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    AllComponent,
    UsuarioDetalleComponent,
    CrearAdminComponent,
    AllAdmisComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
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
    MatChipsModule,
  ],
  exports: [
    UsuarioLoginComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    AllComponent,
    UsuarioDetalleComponent,
    CrearAdminComponent,
    AllAdmisComponent,
    PerfilComponent,
  ]
})
export class UsuarioModule { }

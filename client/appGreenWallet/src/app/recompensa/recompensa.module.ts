import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecompensaRoutingModule } from './recompensa-routing.module';
import { AllComponent } from './all/all.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { HistorialComponent } from './historial/historial.component';
import { DetalleComponent } from './detalle/detalle.component';


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
    RecompensaRoutingModule
  ]
})
export class RecompensaModule { }

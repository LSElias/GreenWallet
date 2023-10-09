import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { NoEncontradoComponent } from './core/no-encontrado/no-encontrado.component';

const routes: Routes = [
  { path:'inicio',component: InicioComponent},
  { path:'', redirectTo:'/inicio' , pathMatch:'full'},
  { path:'**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { AllComponent } from './all/all.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';

const routes: Routes = [
  
  {path:'usuario/mantenimiento', component: AllComponent},
  {
  path: 'usuario',
  component: UsuarioIndexComponent,    
  children:[
    {
      path: 'registrar', component: UsuarioCreateComponent,
    },
    {
      path: 'login', component: UsuarioLoginComponent,
    }
  ]
  },
  {path:'usuario/detalle/:id', component: UsuarioDetalleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

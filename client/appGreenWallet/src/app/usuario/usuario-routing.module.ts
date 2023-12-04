import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { AllComponent } from './all/all.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { CrearAdminComponent } from './crear-admin/crear-admin.component';

const routes: Routes = [
  
  {path:'usuario/mantenimiento', component: AllComponent},
  {path:'usuario/crear', component: CrearAdminComponent},
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
  {path:'usuario/actualizar/:id', component: CrearAdminComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

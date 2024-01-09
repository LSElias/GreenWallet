import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { AllComponent } from './all/all.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { CrearAdminComponent } from './crear-admin/crear-admin.component';
import { AllAdmisComponent } from './all-admis/all-admis.component';
import { PerfilComponent } from './perfil/perfil.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  
  {path:'usuario/mantenimiento', component: AllComponent,
  canActivate:[authGuard], data:{rol:[1]}},

  {path:'usuario/administradores', component: AllAdmisComponent,
  canActivate:[authGuard], data:{rol:[1]}},

  {path:'usuario/crear', component: CrearAdminComponent,
  canActivate:[authGuard], data:{rol:[1]}},

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
  {path:'usuario/detalle/:id', component: UsuarioDetalleComponent,
  canActivate:[authGuard], data:{rol:[1]}},
 
  {path:'usuario/actualizar/:id', component: CrearAdminComponent,
  canActivate:[authGuard], data:{rol:[1]}},
 
  {path:'usuario/act/:id', component: PerfilComponent,
  canActivate:[authGuard], data:{rol:[1,2,3]}},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioIndexComponent,
    children:[
      {
        path: 'registrar', component: UsuarioCreateComponent,
      },
      {
        path: 'login', component: UsuarioLoginComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

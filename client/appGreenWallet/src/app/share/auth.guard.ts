import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NotificacionService, TipoMessage } from './notificacion.service';
import { inject } from '@angular/core';

export class UserGuard {
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);
  noti: NotificacionService = inject(NotificacionService);
  auth: boolean = false;
  currentUser: any;
  constructor() {
    //Subscripción a la información del usuario actual
    this.authService.decodeToken.subscribe((usuario:any) => (this.currentUser = usuario));
    //Subscripción al boolean que indica si esta autenticado
    this.authService.isAuthenticated.subscribe((valor) => (this.auth = valor));
  }
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth) {
      const userRole = this.currentUser.rol;
      //roles.length && roles.indexOf(verify.role)===-1
      if (
        route.data['rol'].length &&
        !route.data['rol'].includes(userRole)
      ) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario Sin permisos para acceder`,
          TipoMessage.warning,
          '/usuario/login'
        );
        this.router.navigate(['/usuario/login']);
        return false;
      }
      return true;
    }
    this.noti.mensajeRedirect(
      'Usuario',
      `Usuario No autenticado`,
      TipoMessage.warning,
      '/usuario/login'
    );
    return false;
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  let userGuard = new UserGuard();
  return userGuard.checkUserLogin(route);
};

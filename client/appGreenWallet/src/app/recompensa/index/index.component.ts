import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  breakpoint: number;
  isAutenticated: boolean;
  currentUser: any;

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute 
    ) {
    this.listarRec();
  }

  listarRec() {
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService
      .list('recompensa')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
      });
  }


  ngOnInit() {
    this.authService.decodeToken.subscribe((user: any) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });

    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.breakpoint = window.innerWidth <= 1080 ? 1 : 3;
  }

  comprar(id: number) {
    this.router.navigate(['/recompensa/intercambio', id], {
      relativeTo: this.route,
    });
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1080 ? 1 : 3;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

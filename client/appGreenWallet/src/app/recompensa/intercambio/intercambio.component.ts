import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.component.html',
  styleUrls: ['./intercambio.component.css'],
})
export class IntercambioComponent implements OnInit {
  rec: any = null;
  idRec: any;
  user: any;
  bill: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService,
    private noti: NotificacionService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken.subscribe((user: any) => {
      this.user = user;
    });

    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.getBilletera();
    this.activeRouter.params.subscribe((params: Params) => {
      this.idRec = params['id'];
      this.listarRec();
    });
  }

  listarRec() {
    this.gService
      .get('recompensa', this.idRec)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.rec = response;
      });
  }

  getBilletera() {
    this.gService
      .get('billetera', this.user.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.bill = response;
      });
  }

  submitInfo() {
    var data = {
      idUsuario: this.user.idUsuario,
      idRecompensa: this.rec.idRecompensas,
      idEstado: 2,
    };

    if (data.idUsuario != null && data.idRecompensa != null) {
      this.gService
        .create('cupon', data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.noti.mensajeRedirect(
            'Cupón intercambiado',
            `¡Disfruta de tu recompensa!`,
            TipoMessage.success,
            `/recompensa/cupon/${data.idCupon}`
          );
          this.router.navigate([`/recompensa/cupon/${data.idCupon}`]);
        });
    }
  }
}

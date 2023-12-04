import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  billetera: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  breakpoint: number;
  isAutenticated: boolean;
  currentUser: any;

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken.subscribe((user: any) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });

    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.getBill();

    this.breakpoint = window.innerWidth <= 1080 ? 1 : 3;
  }

  getBill() {
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService
      .get('billetera', this.currentUser.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.billetera = response;
      });
  }
}
